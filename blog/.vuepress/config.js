module.exports = {
  title: 'Bailey Burnsed',
  description: 'Personal Blog of a Aspie Nerd and Self Tought FullStack Software Developer/Devops Engineer',
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Blog',
        link: '/_posts',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
      { text: 'Portflio',
		    link: '/portflio/',
      },
      {
        text: 'Contact',
        link: '/contact.html'
      }
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/Burnsedia',
        },
        {
          type: 'email',
          link: 'bburnsed1995@gmail.com',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/Burnsed3dArt'
        }
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'AGPLv3 | Copyright © 2020-present Burnsedia',
          link: '',
        },
      ],
    },
  },
}
