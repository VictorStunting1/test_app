import { sounds, type SoundName } from "@/config/audio";

// Le contexte audio est débloqué directement depuis le clic/tap sur mobile.
// Chaque source est à usage unique : un nouveau départ repart toujours à 0.
export class InvitationAudio {
  private context: AudioContext | null = null;
  private files = new Map<SoundName, Promise<ArrayBuffer | null>>();
  private buffers = new Map<SoundName, Promise<AudioBuffer | null>>();
  private source: AudioBufferSourceNode | null = null;
  private gain: GainNode | null = null;
  private controller = new AbortController();
  private generation = 0;
  private disposed = false;

  preload() {
    for (const name of Object.keys(sounds) as SoundName[]) {
      if (this.files.has(name)) continue;
      this.files.set(
        name,
        fetch(sounds[name].src, { signal: this.controller.signal })
          .then((response) => (response.ok ? response.arrayBuffer() : null))
          .catch(() => null),
      );
    }
  }

  stopSound() {
    this.generation += 1;
    if (this.source) {
      this.source.onended = null;
      try {
        this.source.stop();
      } catch {
        /* Déjà terminée ou pas encore démarrée. */
      }
      this.source.disconnect();
      this.source = null;
    }
    this.gain?.disconnect();
    this.gain = null;
  }

  async playSound(name: SoundName, { delayMs = 0 }: { delayMs?: number } = {}) {
    this.stopSound();
    if (this.disposed || document.hidden) return;
    const generation = this.generation;
    const deadline = performance.now() + delayMs;
    try {
      const AudioContextClass =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      this.context ??= new AudioContextClass();
      const context = this.context;
      // Appel synchrone avant le premier await, depuis le geste utilisateur.
      const resumed = context.resume();
      this.preload();
      if (!this.buffers.has(name)) {
        this.buffers.set(
          name,
          this.files
            .get(name)!
            .then((data) =>
              data ? context.decodeAudioData(data.slice(0)) : null,
            )
            .catch(() => null),
        );
      }
      await resumed;
      const buffer = await this.buffers.get(name)!;
      if (
        !buffer ||
        this.disposed ||
        generation !== this.generation ||
        document.hidden ||
        context.state !== "running"
      )
        return;

      const config = sounds[name];
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      source.loop = config.loop;
      source.connect(gain);
      gain.connect(context.destination);
      const startAt =
        context.currentTime + Math.max(0, deadline - performance.now()) / 1000;
      gain.gain.setValueAtTime(config.volume, context.currentTime);
      this.source = source;
      this.gain = gain;
      source.onended = () => {
        source.disconnect();
        gain.disconnect();
        if (this.source === source) {
          this.source = null;
          this.gain = null;
        }
      };
      source.start(startAt, 0);
      if (config.maxSeconds !== null) {
        const duration = Math.min(config.maxSeconds, buffer.duration);
        gain.gain.setValueAtTime(
          config.volume,
          startAt + Math.max(0, duration - 0.3),
        );
        gain.gain.linearRampToValueAtTime(0, startAt + duration);
        source.stop(startAt + duration);
      }
    } catch {
      // Une piste absente ou un blocage audio ne doit jamais bloquer l’invitation.
      if (generation === this.generation) this.stopSound();
    }
  }

  dispose() {
    this.disposed = true;
    this.controller.abort();
    this.stopSound();
    void this.context?.close().catch(() => {});
    this.files.clear();
    this.buffers.clear();
  }
}
