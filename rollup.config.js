import typescript from '@rollup/plugin-typescript';

export default () => {
  return {
    input: './src/index.ts',
    output: {
      file: 'build/bundle.js',
      format: 'es',
    },
    plugins: [typescript()]
  }
};