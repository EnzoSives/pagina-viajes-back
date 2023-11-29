"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImageneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_imagen_dto_1 = require("./create-imagen.dto");
class UpdateImageneDto extends (0, mapped_types_1.PartialType)(create_imagen_dto_1.ImagenDTO) {
}
exports.UpdateImageneDto = UpdateImageneDto;
//# sourceMappingURL=update-imagen.dto.js.map