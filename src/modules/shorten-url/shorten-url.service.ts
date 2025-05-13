import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortenUrlRepository } from "./shorten-url.repository";
import { CreateShortenUrlDto } from "./dto/create-shorten-url.dto";
import { generateCode } from "../../helpers/nanoid.helper";
import { UsersService } from "../users/users.service";
import { UpdateShortenUrlDto } from "./dto/update-shorten-url.dto";

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

  async update(id: number, dto: UpdateShortenUrlDto, userId: number | null) {
    if (!userId) {
      throw new NotFoundException("User not found");
    }
    const shortenedUrl = await this.shortenedUrlRepository.findOne(id);
    if (!id || !shortenedUrl || shortenedUrl?.user?.id !== userId) {
      throw new NotFoundException("URL not found");
    }
    const existingUrl = await this.shortenedUrlRepository.findByUrl(dto.url);
    if (existingUrl && existingUrl.id !== shortenedUrl.id) {
      throw new BadRequestException("URL already exists");
    }
    shortenedUrl.url = dto.url;
    await this.shortenedUrlRepository.update(shortenedUrl);
    return shortenedUrl;
  }

  async remove(id: number, userId: number | null) {
    if (!userId) {
      throw new NotFoundException("User not found");
    }
    const shortenedUrl = await this.shortenedUrlRepository.findOne(id);
    if (!id || !shortenedUrl || shortenedUrl?.user?.id !== userId) {
      throw new NotFoundException("URL not found");
    }
    return await this.shortenedUrlRepository.delete(shortenedUrl);
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

  async findByUserId(userId: number | null) {
    if (!userId) {
      throw new NotFoundException("User not found");
    }
    return this.shortenedUrlRepository.findByUserId(userId);
  }
}
