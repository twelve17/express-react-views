
const otherPresets = [
  '@babel/preset-react',
  [
    '@babel/preset-env',
    {
      modules: 'auto',
      targets: {
        esmodules: true,
        node: 'current',
      },
    },
  ],
];

module.exports = {
  presets: otherPresets,
};