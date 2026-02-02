import { IDigitalContentRepository } from '../../../domain/repositories/IDigitalContentRepository';

export class DownloadDigitalContentUseCase {
  constructor(private digitalContentRepository: IDigitalContentRepository) {}

  async execute(id: number): Promise<Blob> {
    return await this.digitalContentRepository.download(id);
  }
}
