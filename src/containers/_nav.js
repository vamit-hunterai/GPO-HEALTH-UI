/**
 * Author: Lakshman Veti
 * Type: Navigation Object
 * Objective: To render Sidebar Navigation
 * Associated Route/Usage: Layout
*/

/*
function changeTheme(theme){
  //console.log(theme)
  var el = document.getElementById('theme_css');
  el.setAttribute('href', '/'+theme+'.css');
  localStorage.setItem('theme',theme)
}
*/

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Upload',
    to: '/upload',
    icon: 'cil-cloud-upload',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Search',
    route: '/search',
    icon: 'cil-search',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Resources',
        to: '/search/segment-resources',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Milestones',
        to: '/search/segment-milestones'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Commercials',
        to: '/search/segment-commercials'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Contacts',
        to: '/search/segment-contacts'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Invoices',
        to: '/search/segment-invoices'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'PO',
        to: '/'
      }
    ],
  }
  ,
  {
    _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'cil-speedometer',
  }
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Theme',
  //   route: '/theme',
  //   icon: 'cil-drop',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Classic',
  //       route: '/theme',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('classic');
  //         }
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Dark',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('dark');
  //         }
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Gold',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('gold');
  //         }
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Blue',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('blue');
  //         }
  //     }
  //   ]
  // }
]

export default _nav;