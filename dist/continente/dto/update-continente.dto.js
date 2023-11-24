"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContinenteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_continente_dto_1 = require("./create-continente.dto");
class UpdateContinenteDto extends (0, mapped_types_1.PartialType)(create_continente_dto_1.ContinenteDTO) {
}
exports.UpdateContinenteDto = UpdateContinenteDto;
//# sourceMappingURL=update-continente.dto.js.map