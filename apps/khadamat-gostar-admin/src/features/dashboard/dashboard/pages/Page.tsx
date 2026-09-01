"use client";

import { BankOutlined, LogoutOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import { useTranslate } from "@repo/i18n/react";

import { BulletinCard } from "../organisms/BulletinCard";
import { DashboardControls } from "../organisms/DashboardControls";
import { EventsCard } from "../organisms/EventsCard";
import { MessagesCard } from "../organisms/MessagesCard";
import { ProfileCard } from "../organisms/ProfileCard";
import { ServiceModalHost } from "../organisms/ServiceModalHost";
import { useDashboardViewModel } from "../model/ViewModel";

export default function DashboardView() {
  const translate = useTranslate();
  const {
    logout,
    userName,
    accountInfo,
    quickActions,
    messages,
    events,
    bulletins,
    isLoadingEvents,
    isLoadingBulletins,
    isLoadingMessages,
    selectedServiceKey,
    openServiceModal,
    closeServiceModal,
  } = useDashboardViewModel();

  return (
    <div className="portal-dashboard">
      <header className="portal-topbar">
        <div className="portal-brand-block">
          <span className="portal-brand-mark">
            <BankOutlined />
          </span>
          <div className="portal-brand-copy">
            <Typography.Text className="portal-brand-title">
              {translate("dashboardBrandTitle")}
            </Typography.Text>
            <Typography.Text className="portal-brand-subtitle">
              {accountInfo?.unit_name ||
                accountInfo?.center_names ||
                translate("dashboardFallbackOrganization")}
            </Typography.Text>
          </div>
        </div>

        <div className="portal-menu-actions">
          <DashboardControls />
          <button
            type="button"
            onClick={() => logout()}
            className="portal-logout-btn"
            aria-label={translate("dashboardLogout")}
          >
            <LogoutOutlined />
            {translate("dashboardLogout")}
          </button>
        </div>
      </header>

      <main className="portal-main">
        <div className="portal-grid">
          <div className="portal-col-profile">
            <ProfileCard
              userName={userName}
              accountInfo={accountInfo}
              quickActions={quickActions}
              onActionClick={openServiceModal}
            />
          </div>

          <div className="portal-col-messages">
            <MessagesCard
              messages={messages}
              isLoading={isLoadingMessages}
              onShowAll={() => openServiceModal("messages")}
            />
          </div>

          <div className="portal-col-side">
            <EventsCard notifications={events} isLoading={isLoadingEvents} />
            <BulletinCard
              notifications={bulletins}
              isLoading={isLoadingBulletins}
            />
          </div>
        </div>
      </main>

      <ServiceModalHost
        selectedServiceKey={selectedServiceKey}
        onClose={closeServiceModal}
      />
    </div>
  );
}
