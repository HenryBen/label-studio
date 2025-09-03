import { type FormEventHandler, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button, InputFile, ToastType, useToast, Userpic } from "@humansignal/ui";
import { useTranslation } from "react-i18next";
// @todo we should not use anything from `apps` in `libs`
import { API } from "apps/labelstudio/src/providers/ApiProvider";
import styles from "../AccountSettings.module.scss";
import { useCurrentUserAtom } from "@humansignal/core/lib/hooks/useCurrentUser";
import { atomWithMutation } from "jotai-tanstack-query";
import { useAtomValue } from "jotai";


/**
 * FIXME: This is legacy imports. We're not supposed to use such statements
 * each one of these eventually has to be migrated to core or ui
 */
import { Input } from "apps/labelstudio/src/components/Form/Elements";

const updateUserAvatarAtom = atomWithMutation(() => ({
  mutationKey: ["update-user"],
  async mutationFn({
    userId,
    body,
    isDelete,
  }: { userId: number; body: FormData; isDelete?: never } | { userId: number; isDelete: true; body?: never }) {
    const response = isDelete 
      ? await API.invoke(
          "deleteUserAvatar" as keyof typeof API.methods,
          {
            pk: userId,
          }
        )
      : await API.invoke(
          "updateUserAvatar" as keyof typeof API.methods,
          {
            pk: userId,
          },
          {
            body,
          },
        );
    return response;
  },
}));

export const PersonalInfo = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { user, fetch: refetchUser, isInProgress: userInProgress, updateAsync: updateUser } = useCurrentUserAtom();
  const updateUserAvatar = useAtomValue(updateUserAvatarAtom);
  const [isInProgress, setIsInProgress] = useState(false);
  const [fname, setFname] = useState(user?.first_name);
  const [lname, setLname] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const avatarRef = useRef<HTMLInputElement>();
  const fileChangeHandler: FormEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      if (!user) return;

      const input = e.currentTarget as HTMLInputElement;
      const body = new FormData();
      body.append("avatar", input.files?.[0] ?? "");
      const response = await updateUserAvatar.mutateAsync({
        body,
        userId: user.id,
      });

      if (!response.$meta.ok) {
        toast?.show({ message: response?.response?.detail ?? t('accountSettings.errorUpdatingAvatar'), type: ToastType.error });
      } else {
        refetchUser();
      }
      input.value = "";
    },
    [user?.id],
  );

  const deleteUserAvatar = async () => {
    if (!user) return;
    await updateUserAvatar.mutateAsync({ userId: user.id, isDelete: true });
    refetchUser();
  };

  const userFormSubmitHandler: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) return;
      const body = new FormData(e.currentTarget as HTMLFormElement);
      const json = Object.fromEntries(body.entries());
      const response = await updateUser(json);

      refetchUser();
      if (!response?.$meta.ok) {
        toast?.show({ message: response?.response?.detail ?? t('accountSettings.errorUpdatingUser'), type: ToastType.error });
      }
    },
    [user?.id],
  );

  useEffect(() => {
    setIsInProgress(userInProgress);
  }, [userInProgress]);

  useEffect(() => {
    setFname(user?.first_name);
    setLname(user?.last_name);
    setPhone(user?.phone);
  }, [user]);

  return (
    <div className={styles.section} id="personal-info">
      <div className={styles.sectionContent}>
        <div className={styles.flexRow}>
          <Userpic user={user} isInProgress={userInProgress} size={92} style={{ flex: "none" }} />
          <form className={styles.flex1}>
            <InputFile
              name="avatar"
              onChange={fileChangeHandler}
              accept="image/png, image/jpeg, image/jpg"
              text={t('accountSettings.uploadImage')}
              noFileSelectedText={t('accountSettings.noFileSelected')}
              ref={avatarRef}
            />
          </form>
          {user?.avatar && (
            <Button type="submit" variant="negative" look="outlined" size="medium" onClick={deleteUserAvatar}>
              {t('accountSettings.delete')}
            </Button>
          )}
        </div>
        <form onSubmit={userFormSubmitHandler} className={styles.sectionContent}>
          <div className={styles.flexRow}>
            <div className={styles.flex1}>
              <Input
                label={t('accountSettings.firstName')}
                value={fname}
                onChange={(e: React.KeyboardEvent<HTMLInputElement>) => setFname(e.currentTarget.value)}
                name="first_name"
              />
            </div>
            <div className={styles.flex1}>
              <Input
                label={t('accountSettings.lastName')}
                value={lname}
                onChange={(e: React.KeyboardEvent<HTMLInputElement>) => setLname(e.currentTarget.value)}
                name="last_name"
              />
            </div>
          </div>
          <div className={styles.flexRow}>
            <div className={styles.flex1}>
              <Input label={t('accountSettings.email')} type="email" readOnly={true} value={user?.email} />
            </div>
            <div className={styles.flex1}>
              <Input
                label={t('accountSettings.phone')}
                type="phone"
                onChange={(e: React.KeyboardEvent<HTMLInputElement>) => setPhone(e.currentTarget.value)}
                value={phone}
                name="phone"
              />
            </div>
          </div>
          <div className={clsx(styles.flexRow, styles.flexEnd)}>
            <Button look="filled" style={{ width: 125 }} waiting={isInProgress}>
              {t('accountSettings.save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
