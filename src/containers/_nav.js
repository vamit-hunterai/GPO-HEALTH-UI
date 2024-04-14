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

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/',
    icon: 'cil-home',
  },
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
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Dashboard',
    route: '/dashboard',
    icon: 'cil-speedometer',
    _children: [
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Client05',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'ABG',
            href: 'https://app.powerbi.com/reportEmbed?reportId=ebeb553e-f48e-464c-bac2-86d6ffdd009d&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
            target: '_blank'
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Hunterai_Product',
            href: 'https://app.powerbi.com/reportEmbed?reportId=99c5bd24-dc18-4e78-8622-202ec8bcf2e2&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
            target: '_blank'
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'R-III',
            href: 'https://app.powerbi.com/reportEmbed?reportId=6b7d9dcc-4b50-4ff0-a16c-f83bd29acef4&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
            target: '_blank'
          }
        ]
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'IT',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Report01',
            href: 'https://app.powerbi.com/reportEmbed?reportId=2952484e-de7d-4003-bf5c-d0f4fefe87e7&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
            target: '_blank'
          }
        ]
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'API Admin',
    href: '#',
    icon: 'cil-settings'
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
