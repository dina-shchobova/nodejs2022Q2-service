import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { isNull } from 'util';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
