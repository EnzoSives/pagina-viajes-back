"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaisDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pais_dto_1 = require("./create-pais.dto");
class UpdatePaisDto extends (0, mapped_types_1.PartialType)(create_pais_dto_1.PaisDTO) {
}
exports.UpdatePaisDto = UpdatePaisDto;
//# sourceMappingURL=update-pais.dto.js.map