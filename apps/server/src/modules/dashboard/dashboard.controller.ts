import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RecentFilesQueryDto } from './dto/recent-files-query.dto';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats(@Req() req) {
    return this.dashboardService.getStats(req.user.id);
  }

  @Get('recent-files')
  getRecentFiles(@Req() req, @Query() query: RecentFilesQueryDto) {
    return this.dashboardService.getRecentFiles(req.user.id, query.limit);
  }
}
