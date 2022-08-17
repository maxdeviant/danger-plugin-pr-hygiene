with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "danger-plugin-pr-hygiene";

  buildInputs = [
    nodejs
    yarn
  ];
}
