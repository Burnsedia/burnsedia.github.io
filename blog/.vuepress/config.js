module.exports = {
  title: 'Bailey Burnsed',
  description: 'Personal Blog of a Aspie Nerd and Self Tought FullStack Software Developer/Devops Engineer',

 theme: '@vuepress/blog',  // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    /**
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    */
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text:'Home',
        link: '/'
      },
      {
        text: 'Blog',
        link: '/_post/'
      },
      { text: 'Portflio',
        link: '/portflio/',
      },
      {
        text:'Store',
        link:'/store/'
      },
      {
        text:'Services',
        link: '/services/'
      },
      {
        text: 'Contact',
        link: '/contact.html'
      }
    ],
    
    sidebar: 'auto',

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
          type: 'linkedin',
          link: 'https://www.linkedin.com/in/bailey-burnsed-50051115a/'
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/Burnsed3dArt'
        },
        {
          type: 'medium',
          link: 'https://medium.com/baileyburnsed'
        }
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'AGPLv3 | Copyright © 2020-present Burnsedia',
          link: 'https://github.com/Burnsedia/burnsedia.github.io',
        },
      ],
    },
  },
}
