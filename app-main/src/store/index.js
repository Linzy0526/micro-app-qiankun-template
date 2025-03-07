import { createStore } from "vuex";

const APP_LIST = [
    {
        title: "子应用Vue3", appName: "app-child-vue3",
        routeRole: [{
            path: "/user", title: "用户管理", icon: "icon-icreport", key: "appChildVue3User", children: [
                { path: "/user/list", title: "用户列表", icon: "icon-icreport", key: "appChildVue3UserList" },
                { path: "/user/detail", title: "用户详情", icon: "icon-icreport", key: "appChildVue3UserDetail" }
            ]
        }]
    },
    {
        title: "子应用React", appName: "app-child-react",
        routeRole: [{
            path: "/product", title: "商品管理", icon: "icon-icreport", key: "appChildReactProduct", children: [
                { path: "/product/list", title: "商品列表", icon: "icon-icreport", key: "appChildReactProductList" },
                { path: "/product/detail", title: "商品详情", icon: "icon-icreport", key: "appChildReactProductDetail" }
            ]
        }]
    },
]


function getRouteRole(routeList = [], appName = "") {
    let routeRole = []
    routeList.forEach(route => {
        if (route.children && route.children.length) {
            routeRole = [...getRouteRole(route.children, appName), ...routeRole]
        } else {
            routeRole.push({
                path: `/${appName}${route.path}`,
                title: route.title,
                icon: route.icon,
                key: route.key,
                appName,
            })
        }
    })
    return routeRole
}


export default createStore({
    state: {
        currentAppName: "",
        appList: APP_LIST,
        routeRole: APP_LIST.map(app => getRouteRole(app.routeRole, app.appName)).flat()
    },
    mutations: {
        setCurrentAppName(state, appName) {
            state.currentAppName = appName
        }
    },
    actions: {},
    getters: {
        currentAppRouteRole(state) {
            return APP_LIST.find(app => app.appName === state.currentAppName)?.routeRole || []
        }
    },
    modules: {
    }
});
