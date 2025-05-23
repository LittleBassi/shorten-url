import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShortenedUrl } from "./entities/shortened-url.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class ShortenUrlRepository {
  constructor(
    @InjectRepository(ShortenedUrl)
    protected readonly shortenedUrlRepository: Repository<ShortenedUrl>,
  ) {}

  async findOne(id: number) {
    return this.shortenedUrlRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async findByCode(code: string) {
    return this.shortenedUrlRepository.findOne({
      where: { shortenedCode: code },
    });
  }

  async findByUrl(url: string) {
    return this.shortenedUrlRepository.findOne({ where: { url } });
  }

  async findByUserId(userId: number) {
    return this.shortenedUrlRepository.find({
      where: { user: { id: userId } },
    });
  }

  create(shortenedUrl: DeepPartial<ShortenedUrl>) {
    return this.shortenedUrlRepository.create(shortenedUrl);
  }

  async update(shortenedUrl: DeepPartial<ShortenedUrl>) {
    return this.shortenedUrlRepository.save(shortenedUrl);
  }

  async delete(shortenedUrl: ShortenedUrl) {
    return this.shortenedUrlRepository.softRemove(shortenedUrl);
  }
}
