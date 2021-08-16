const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Alexander\'s Blog',
  tagline: 'Dinosaurs are cool',
  url: 'https://www.alexanderlolis.com',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'alolis', 
  projectName: 'www.alexanderlolis.com',
  themeConfig: {
    navbar: {
      title: 'Alexander\'s Blog',
      logo: {
        alt: 'Alexander\'s Blog Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://github.com/alolis',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/alexander-lolis-59aa2ab9',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://twitter.com/alexanderlolis',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Alexander's Blog. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    googleAnalytics: {
      trackingID: 'UA-162440229-1',
      anonymizeIP: true, // Should IPs be anonymized?
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          showReadingTime: true,
          path: './blog',
          routeBasePath: '/',
          blogSidebarCount: 10 
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }
    ],
  ]
};
