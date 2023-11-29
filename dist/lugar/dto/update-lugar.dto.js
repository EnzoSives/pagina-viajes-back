"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLugarDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lugar_dto_1 = require("./create-lugar.dto");
class UpdateLugarDto extends (0, mapped_types_1.PartialType)(create_lugar_dto_1.LugarDTO) {
}
exports.UpdateLugarDto = UpdateLugarDto;
//# sourceMappingURL=update-lugar.dto.js.map