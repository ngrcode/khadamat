'use client';

import React from 'react';
import { Checkbox } from 'antd';
import type { FieldProps } from 'formik';

export type MenuItem = {
        title: string;
        icon: string;
        url: string;
        child: MenuItem[] | null;
};

export const PANEL_MENU_TEMPLATE: MenuItem[] = [
        {
                title: 'داشبورد',
                icon: '',
                url: '',
                child: [
                        {
                                title: 'خانه',
                                icon: '',
                                url: '/',
                                child: null,
                        },
                ],
        },
        {
                title: 'اصلی',
                icon: '',
                url: '',
                child: [
                        {
                                title: 'تابلو اعلانات',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست اعلانات', icon: '', url: '/notification', child: null },
                                        { title: 'افزودن اعلان جدید', icon: '', url: '/notification/create', child: null },
                                ],
                        },
                        {
                                title: 'رویداد های نزدیک',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست رویداد ها', icon: '', url: '/upcoming', child: null },
                                        { title: 'افزودن رویداد جدید', icon: '', url: '/upcoming/create', child: null },
                                ],
                        },
                        {
                                title: 'مدیریت کاربران',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست کاربران', icon: '', url: '/users', child: null },
                                        { title: 'ایجاد کاربر جدید', icon: '', url: '/user/create', child: null },
                                ],
                        },
                        {
                                title: 'مرخصی ها',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست مرخصی ها', icon: '', url: '/requestLeave', child: null },
                                ],
                        },
                        {
                                title: 'پیام ها',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست پیام ها', icon: '', url: '/ticket', child: null },
                                ],
                        },
                        {
                                title: 'فیش حقوقی',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'بارگزاری فیش حقوقی', icon: '', url: '/excel/create', child: null },
                                        { title: 'لیست فیش ها', icon: '', url: '/excel', child: null },
                                ],
                        },
                        {
                                title: 'واحد های سازمانی',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست واحد ها', icon: '', url: '/unit', child: null },
                                        { title: 'ایجاد واحد جدید', icon: '', url: '/unit/create', child: null },
                                ],
                        },
                        { title: 'پیرایشگاه', icon: '', url: '/barbershop', child: null },
                        { title: 'ولنجک', icon: '', url: '/velenjak', child: null },
                        {
                                title: 'نقش ها',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست نقش ها', icon: '', url: '/role', child: null },
                                        { title: 'افزودن نقش جدید', icon: '', url: '/role/create', child: null },
                                ],
                        },
                        { title: 'کسر اقساط', icon: '', url: '/kasr', child: null },
                        { title: 'بروزرسانی شماره تلفن کارمندان', icon: '', url: '/UpdatePhone', child: null },
                        {
                                title: 'احکام کارگزینی',
                                icon: '',
                                url: '',
                                child: [
                                        { title: 'لیست احکام', icon: '', url: '/hokm', child: null },
                                        { title: 'افزودن حکم جدید', icon: '', url: '/hokm/create', child: null },
                                ],
                        },
                ],
        },
];

const getSelectableKeys = (item: MenuItem): string[] => {
        if (!item.child?.length) return item.url ? [item.url] : [];
        return item.child.flatMap(getSelectableKeys);
};

const filterMenuBySelectedUrls = (
        menus: MenuItem[],
        selectedUrls: string[]
): MenuItem[] => {
        return menus
                .map((menu) => {
                        if (!menu.child?.length) {
                                return menu.url && selectedUrls.includes(menu.url) ? menu : null;
                        }

                        const filteredChildren = filterMenuBySelectedUrls(menu.child, selectedUrls);

                        if (filteredChildren.length > 0) {
                                return {
                                        ...menu,
                                        child: filteredChildren,
                                };
                        }

                        return null;
                })
                .filter(Boolean) as MenuItem[];
};

export const buildPanelMenuString = (selectedUrls: string[]) => {
        return JSON.stringify(filterMenuBySelectedUrls(PANEL_MENU_TEMPLATE, selectedUrls));
};

const MenuPermissionsFormik: React.FC<FieldProps<string[]>> = ({ field, form }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : [];

        const toggleUrl = (url: string, checked: boolean) => {
                const nextValues = checked
                        ? Array.from(new Set([...selectedValues, url]))
                        : selectedValues.filter((item) => item !== url);

                form.setFieldValue(field.name, nextValues);
        };

        const toggleGroup = (urls: string[], checked: boolean) => {
                const nextValues = checked
                        ? Array.from(new Set([...selectedValues, ...urls]))
                        : selectedValues.filter((item) => !urls.includes(item));

                form.setFieldValue(field.name, nextValues);
        };

        const renderMenu = (item: MenuItem, level = 0) => {
                const urls = getSelectableKeys(item);
                const checkedCount = urls.filter((url) => selectedValues.includes(url)).length;
                const isGroup = !!item.child?.length;
                const isChecked = urls.length > 0 && checkedCount === urls.length;
                const isIndeterminate = checkedCount > 0 && checkedCount < urls.length;

                return (
                        <div key={`${item.title}-${item.url}`} className="mb-3" style={{ marginRight: level * 20 }}>
                                <Checkbox
                                        className="app-form-checkbox__control"
                                        checked={isChecked}
                                        indeterminate={isIndeterminate}
                                        onChange={(e) => {
                                                if (isGroup) {
                                                        toggleGroup(urls, e.target.checked);
                                                } else if (item.url) {
                                                        toggleUrl(item.url, e.target.checked);
                                                }
                                        }}
                                >
                                        <span className="app-form-checkbox__label">{item.title}</span>
                                </Checkbox>

                                {item.child?.length ? (
                                        <div className="mt-2">
                                                {item.child.map((child) => renderMenu(child, level + 1))}
                                        </div>
                                ) : null}
                        </div>
                );
        };

        return (
                <div className="app-common-form rounded-xl border p-4">
                        <h4 className="mb-4 font-semibold app-form-section-title">دسترسی منوها</h4>
                        {PANEL_MENU_TEMPLATE.map((item) => renderMenu(item))}
                </div>
        );
};

export default MenuPermissionsFormik;