"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_guard_1 = require("./stats.guard");
const stats_service_1 = require("./stats.service");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    TestStatsController() {
        return {
            message: 'Hello Admin, welcome to the Stats route! The route is working fine.',
        };
    }
    async countUsers() {
        return this.statsService.countUsers();
    }
    async countTodos() {
        return this.statsService.countTodos();
    }
    async portainerUptime() {
        return this.statsService.portainerUptime();
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)('test'),
    (0, common_1.UseGuards)(stats_guard_1.TokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "TestStatsController", null);
__decorate([
    (0, common_1.Get)('count-users'),
    (0, common_1.UseGuards)(stats_guard_1.TokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "countUsers", null);
__decorate([
    (0, common_1.Get)('count-todos'),
    (0, common_1.UseGuards)(stats_guard_1.TokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "countTodos", null);
__decorate([
    (0, common_1.Get)('portainer-uptime'),
    (0, common_1.UseGuards)(stats_guard_1.TokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "portainerUptime", null);
exports.StatsController = StatsController = __decorate([
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map