const presets = [
  '@babel/preset-react',
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
];

module.exports = {presets};
