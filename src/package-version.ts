import * as E from 'fp-ts/Either';
import { Either } from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

const PackageJson = t.strict(
  {
    version: t.string,
  },
  'PackageJson'
);

export const tryGetPackageVersion = (
  packageJsonPath: string
): Either<string[], string> =>
  pipe(
    E.tryCatch(
      () => require(packageJsonPath) as unknown,
      error => [`Failed to read '${packageJsonPath}': ${error}`]
    ),
    E.chain(
      flow(PackageJson.decode, E.mapLeft(flow(E.left, PathReporter.report)))
    ),
    E.map(packageJson => packageJson.version)
  );
