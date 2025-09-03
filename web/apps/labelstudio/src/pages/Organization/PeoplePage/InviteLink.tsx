import { Button, Typography } from "@humansignal/ui";
import { Space } from "@humansignal/ui/lib/space/space";
import { Block } from "apps/labelstudio/src/components/Menu/MenuContext";
import { Modal } from "apps/labelstudio/src/components/Modal/ModalPopup";
import { API } from "apps/labelstudio/src/providers/ApiProvider";
import { useAtomValue } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Form";
import { useTranslation } from "react-i18next";

const linkAtom = atomWithQuery(() => ({
  queryKey: ["invite-link"],
  async queryFn() {
    // called only once when the component is rendered on page reload
    // will also be reset when called `refetch()` on the Reset button
    const result = await API.invoke("resetInviteLink") as any;
    return location.origin + result.invite_url;
  },
}));

export function InviteLink({
  opened,
  onOpened,
  onClosed,
}: {
  opened: boolean;
  onOpened?: () => void;
  onClosed?: () => void;
}) {
  const { t } = useTranslation();
  const modalRef = useRef<any>();
  useEffect(() => {
    if (modalRef.current && opened) {
      modalRef.current?.show?.();
    } else if (modalRef.current && modalRef.current.visible) {
      modalRef.current?.hide?.();
    }
  }, [opened]);

  return (
    <Modal
      ref={modalRef}
      title={t('inviteModal.title', 'Invite people')}
      opened={opened}
      bareFooter={true}
      body={<InvitationModal />}
      footer={<InvitationFooter />}
      style={{ width: 640, height: 472 }}
      onHide={onClosed}
      onShow={onOpened}
    />
  );
}

const InvitationModal = () => {
  const { t } = useTranslation();
  const { data: link } = useAtomValue(linkAtom);
  return (
    <Block name="invite">
      <Input 
        value={link} 
        style={{ width: "100%" }} 
        readOnly 
        label="" 
        description="" 
        footer="" 
        className="" 
        validate="" 
        required={false} 
        skip={false} 
        labelProps={{}} 
        ghost={false} 
        tooltip="" 
        tooltipIcon={null} 
      />
      <Typography size="small" className="text-neutral-content-subtler mt-base mb-wider">
        {t('inviteModal.description', 'Invite people to join your Label Studio instance. People that you invite have full access to all of your projects.')}{" "}
        <a
          href="https://labelstud.io/guide/signup.html"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
          onClick={() =>
            __lsa("docs.organization.add_people.learn_more", {
              href: "https://labelstud.io/guide/signup.html",
            })
          }
        >
          {t('inviteModal.learnMore', 'Learn more')}
        </a>
        .
      </Typography>
    </Block>
  );
};

const InvitationFooter = () => {
  const { t } = useTranslation();
  const { copyText, copied } = useTextCopy();
  const { refetch, data: link } = useAtomValue(linkAtom);

  return (
    <Space spread>
      <Space>
        <Button
          variant="negative"
          look="outlined"
          style={{ width: 170 }}
          onClick={() => refetch()}
          aria-label={t('inviteModal.resetLinkAriaLabel', 'Refresh invite link')}
        >
          {t('inviteModal.resetLink', 'Reset Link')}
        </Button>
      </Space>
      <Space>
        <Button
          variant={copied ? "positive" : "primary"}
          className="w-[170px]"
          onClick={() => copyText(link!)}
          aria-label={t('inviteModal.copyLinkAriaLabel', 'Copy invite link')}
        >
          {copied ? t('inviteModal.copied', 'Copied!') : t('inviteModal.copyLink', 'Copy link')}
        </Button>
      </Space>
    </Space>
  );
};

function useTextCopy() {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback((value: string) => {
    setCopied(true);
    navigator.clipboard.writeText(value ?? "");
    setTimeout(() => setCopied(false), 1500);
  }, []);

  return { copied, copyText };
}
