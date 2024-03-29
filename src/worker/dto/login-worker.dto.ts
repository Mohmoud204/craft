import {
  IsNotEmpty, IsString, IsEmail, IsBoolean, MinLength,
  MaxLength, IsMobilePhone, IsOptional, Length, Matches, IsEnum, IsMongoId, IsUrl
} from 'class-validator';
/*********** email ************/
export class Login_dto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[^<>]*$/, { message: 'email must not contain < or >' })
  readonly email: string;
  /*********** password ************/
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(3, { message: 'the password very short' })
  @MaxLength(20, { message: 'the password very long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^<>]*[A-Za-z\d@$!%*?&]{8,}$/i, {
    message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  })
  readonly password: string;

}