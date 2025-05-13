import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortenUrlRepository } from "./shorten-url.repository";
import { CreateShortenUrlDto } from "./dto/create-shorten-url.dto";
import { generateCode } from "../../helpers/nanoid.helper";
import { UsersService } from "../users/users.service";

@Injectable()
export class ShortenUrlService {
  constructor(
    protected readonly shortenedUrlRepository: ShortenUrlRepository,
    protected readonly usersService: UsersService,
    @Inject("API_ROUTE") protected readonly apiRoute: string,
  ) {}

  async create(dto: CreateShortenUrlDto, userId?: number) {
    let shortenedUrl = await this.findByUrl(dto.url);
    if (!shortenedUrl) {
      shortenedUrl = this.shortenedUrlRepository.create(dto);
      shortenedUrl.shortenedCode = await generateCode();
      if (userId) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
          throw new NotFoundException("User not found");
        }
        shortenedUrl.user = user;
      }
      await this.shortenedUrlRepository.update(shortenedUrl);
    }
    return `${this.apiRoute}/${shortenedUrl.shortenedCode}`;
  }

  async findByCode(code: string) {
    const shortenedUrl = await this.shortenedUrlRepository.findByCode(code);
    if (!shortenedUrl) {
      throw new NotFoundException("URL not found");
    }
    return shortenedUrl;
  }

  async findByUrl(url: string) {
    return this.shortenedUrlRepository.findByUrl(url);
  }
}
