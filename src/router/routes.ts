export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true,//是否隐藏
            icon: 'Promotion'
        }

    },
    {
        //登录成功以后显示的数据
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect: '/home',
        meta: {
            title: '',
            hidden: false,//是否隐藏
            icon: ''//文字图标
        },
        children:
            [
                {
                    path: '/home',
                    component: () => import('@/views/home/index.vue'),
                    meta: {
                        title: '首页',
                        hidden: false,//是否隐藏
                        icon: 'HomeFilled'//文字图标

                    }
                },

            ]
    },
    {
        //404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,//是否隐藏
            icon: 'HomeFilled'//文字图标
        }

    },
    {
        //any
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,//是否隐藏
            icon: 'DataLine'//文字图标
        }

    },
    {
        //数据大屏
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta: {
            title: '数据大屏',
            hidden: false,//是否隐藏
            icon: 'Platform'//文字图标
        }

    },
    {
        //权限管理
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,//是否隐藏
            icon: 'Lock'//文字图标
        },
        redirect: '/acl/user',
        children:
            [
                {
                    path: '/acl/user',
                    component: () => import('@/views/acl/user/index.vue'),
                    name: 'Acl',
                    meta: {
                        title: '用户管理',
                        hidden: false,//是否隐藏
                        icon: 'user'//文字图标

                    }
                },
                {
                    path: '/acl/role',
                    component: () => import('@/views/acl/role/index.vue'),
                    name: 'Role',
                    meta: {
                        title: '角色管理',
                        hidden: false,//是否隐藏
                        icon: 'UserFilled'//文字图标

                    }
                },
                {
                    path: '/acl/permission',
                    component: () => import('@/views/acl/permission/index.vue'),
                    name: 'Permission',
                    meta: {
                        title: '菜单管理',
                        hidden: false,//是否隐藏
                        icon: 'Monitor'//文字图标

                    }
                }

            ]


    },
    //商品管理
    {
        //权限管理
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,//是否隐藏
            icon: 'Goods'//文字图标
        },
        redirect: '/product/tradermark',
        children:
            [
                {
                    path: '/product/tradermark',
                    component: () => import('@/views/product/tradermark/index.vue'),
                    name: 'Tradermark',
                    meta: {
                        title: '品牌管理',

                        icon: 'ShoppingCartFull'//文字图标

                    }
                },
                {
                    path: '/product/attr',
                    component: () => import('@/views/product/attr/index.vue'),
                    name: 'Attr',
                    meta: {
                        title: '属性管理',
                        icon: 'ChromeFilled'//文字图标

                    }
                },
                {
                    path: '/product/spu',
                    component: () => import('@/views/product/spu/index.vue'),
                    name: 'Spu',
                    meta: {
                        title: 'SPU管理',
                        icon: 'Calendar'//文字图标

                    }
                },
                {
                    path: '/product/sku',
                    component: () => import('@/views/product/sku/index.vue'),
                    name: 'Sku',
                    meta: {
                        title: 'SKU管理',
                        icon: 'Orange'//文字图标

                    }
                },

            ]


    },


]
//异步路由:用户的的人有这个路由,有的人没有[动态追加异步路由]
export let asnycRoute = [
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            icon: 'Lock'
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    icon: 'Monitor'
                }
            }
        ]
    }
    ,
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/tradermark/index.vue'),
                name: "Trademark",
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCartFull',
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: "Attr",
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled',
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: "Spu",
                meta: {
                    title: 'SPU管理',
                    icon: 'Calendar',
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: "Sku",
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange',
                }
            },
        ]
    }
]

//任意路由
export let anyRoute = {
    //任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine'
    }
}
