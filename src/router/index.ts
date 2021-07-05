import Design from "@/views/design";
import Home from "@/views/home";
import NotFound from "@/views/not-found";
import Layout from '@/views/layout'
import {RouteProps} from 'react-router-dom'
import FtMaker from '@/views/ft-maker';

interface RouteConfig extends RouteProps{
  name: string;
  redirect?:string;
  path: string;
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    redirect: '/home'
  },

  {
    path: '/home',
    name: '首页',
    component: Home
  },
  {
    path: '/design',
    name: '设计',
    component: Layout
  },
  {
    path: '/ft-maker',
    name: '表单设计神器',
    component: FtMaker,
  },
  {
    path: '*',
    name: '未知',
    component: NotFound,
  }
];
