// src/onboarding/onboarding.controller.ts
import {
  Controller,
  Patch,
  Post,
  Body,
  Req,
  UseGuards,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { OnboardingService } from "./onboarding.service";
import { OnboardingDto } from "./dto/onboarding.dto";

const logger = new Logger("OnboardingController");

@Controller("onboarding")
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async processOnboarding(@Req() req, @Body() dto: OnboardingDto) {
    if (!req.user?.id) {
      logger.warn("processOnboarding called without req.user.id");
      throw new BadRequestException("User not found in token");
    }

    logger.log(`Starting onboarding for user ${req.user.id} roles=${dto.roles}`);
    return this.onboardingService.processOnboarding(req.user.id, dto);
  }

  @Patch("complete")
  @UseGuards(JwtAuthGuard)
  async complete(@Req() req) {
    if (!req.user?.id) {
      logger.warn("complete onboarding called without req.user.id");
      throw new BadRequestException("User not found in token");
    }

    logger.log(`Marking onboarding complete for user ${req.user.id}`);
    return this.onboardingService.markComplete(req.user.id);
  }
}
