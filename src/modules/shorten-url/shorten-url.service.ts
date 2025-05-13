import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ShortenUrlRepository } from "./shorten-url.repository";
import { CreateShortenUrlDto } from "./dto/create-shorten-url.dto";
import { generateCode } from "src/helpers/nanoid.helper";


@Injectable()
export class ShortenUrlService {
    constructor(
        protected readonly shortenedUrlRepository: ShortenUrlRepository,
        @Inject('API_ROUTE') protected readonly apiRoute: string,
    ) {}

    async create(dto: CreateShortenUrlDto) {
        let shortenedUrl = await this.shortenedUrlRepository.findByUrl(dto.url);
        if (!shortenedUrl) {
            shortenedUrl = this.shortenedUrlRepository.create(dto);
            shortenedUrl.shortenedCode = await generateCode();
            await this.shortenedUrlRepository.update(shortenedUrl);
        }
        return `${this.apiRoute}/${shortenedUrl.shortenedCode}`;
    }

    async findByCode(code: string) {
        const shortenedUrl = await this.shortenedUrlRepository.findByCode(code);
        if (!shortenedUrl) {
            throw new NotFoundException('URL not found');
        }
        return shortenedUrl;
    }

    async findByUrl(url: string) {
        return this.shortenedUrlRepository.findByUrl(url);
    }
}