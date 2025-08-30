import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMsg = errors
      .map((error) => {
        const constraints = Object.entries(error.constraints ?? {})
          .map(([key, value]) => `+ ${key}: ${value}`)
          .join('\n');

        if (!constraints) return '';

        return `\nError in ${error.property}:\n${constraints}`;
      })
      .join('\n');

    console.error(`\n${errors.toString()}`);
    throw new Error(errorMsg);
  }
  return validatedConfig;
}

export default validateConfig;
