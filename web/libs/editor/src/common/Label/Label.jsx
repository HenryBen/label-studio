import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Block, Elem } from "../../utils/bem";
import "./Label.scss";

export const Label = forwardRef(
  ({ text, children, required, placement, description, size, large, style, simple, flat }, ref) => {
    const { t } = useTranslation();
    const tagName = simple ? "div" : "label";
    const mods = {
      size,
      large,
      flat,
      placement,
      withDescription: !!description,
      empty: !children,
    };

    const dataAttributes = {
      'data-required': required,
      ...(required && { 'data-required-text': t('required') })
    };

    return (
      <Block ref={ref} name="field-label" mod={mods} tag={tagName} style={style} {...dataAttributes}>
        <Elem name="text">
          <Elem name="content">
            {text}
            {description && <Elem name="description">{description}</Elem>}
          </Elem>
        </Elem>
        <Elem name="field">{children}</Elem>
      </Block>
    );
  },
);

export default Label;
