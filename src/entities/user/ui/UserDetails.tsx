import { useTranslation } from "react-i18next";
import type { UserDetailsProps } from "../model";
import { DetailItem } from "./DetailItem";

export function UserDetails({ user }: UserDetailsProps) {
  const { t } = useTranslation("user");

  const fullName = [user.firstName, user.maidenName, user.lastName]
    .filter(Boolean)
    .join(" ");

  const address = [user.address.country, user.address.city]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <img
          src={user.image}
          alt={fullName}
          className="
            h-28 w-28
            shrink-0 rounded-full
            border border-slate-200
            bg-slate-100
            object-cover
          "
        />

        <div className="min-w-0 text-center sm:text-left">
          <h3 className="break-words text-xl font-semibold text-slate-900">
            {fullName}
          </h3>
        </div>
      </div>

      <section>
        <h4 className="mb-3 font-semibold text-slate-900">
          {t("users.details.personal")}
        </h4>

        <div className="grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
          <DetailItem
            label={t("users.details.firstName")}
            value={user.firstName}
          />

          <DetailItem
            label={t("users.details.lastName")}
            value={user.lastName}
          />

          <DetailItem
            label={t("users.details.maidenName")}
            value={user.maidenName}
          />

          <DetailItem label={t("users.details.age")} value={user.age} />

          <DetailItem
            label={t("users.details.gender")}
            value={t(`users.gender.${user.gender}`)}
          />
        </div>
      </section>

      <section>
        <h4 className="mb-3 font-semibold text-slate-900">
          {t("users.details.contacts")}
        </h4>

        <dl className="grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
          <DetailItem label={t("users.details.email")} value={user.email} />

          <DetailItem label={t("users.details.phone")} value={user.phone} />

          <DetailItem label={t("users.details.address")} value={address} />
        </dl>
      </section>
    </div>
  );
}
