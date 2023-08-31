import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { UpdateReportDto } from './dto/update-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }

  //Decorator and inceptor works for globally not only one controller
  @Get('whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
