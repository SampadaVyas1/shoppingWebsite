import React from "react";
import Container from "../container";
import ImageComponent from "../imageComponent";
import Typography from "../typography";
import Button from "../button";
import TipContainer from "../tipContainer";
import styles from "./templateCard.module.scss";
import { TOOLTIP_POSITION, TYPOGRAPHY_VARIANT } from "@/common/types/enums";
import { ITemplateCardProps } from "./templateCard.types";
import { formatTemplateName } from "@/common/utils";

const TemplateCard = (props: ITemplateCardProps) => {
  const { header, description, imageUrl, templateName, hasActions } = props;

  const renderTypography = (
    text: string | JSX.Element,
    className: string,
    variant: TYPOGRAPHY_VARIANT
  ) => (
    <Typography variant={variant} customStyle={className}>
      {text}
    </Typography>
  );

  return (
    <Container customClass={styles.templateWrapper}>
      {renderTypography(
        formatTemplateName(templateName!),
        styles.templateTitle,
        TYPOGRAPHY_VARIANT.TEXT_MEDIUM_SEMIBOLD
      )}
      <TipContainer position={TOOLTIP_POSITION.RIGHT}>
        <div className={styles.templateContent}>
          {imageUrl && (
            <ImageComponent src={imageUrl} customClass={styles.templateImage} />
          )}
          {header &&
            renderTypography(header, "", TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR)}
          {description &&
            renderTypography(
              description,
              "",
              TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR
            )}
        </div>
      </TipContainer>
      {hasActions && (
        <React.Fragment>
          <Button
            customStyle={styles.templateButton}
          >{`I am interested`}</Button>
          <Button customStyle={styles.templateButton}>Know More</Button>
        </React.Fragment>
      )}
    </Container>
  );
};
export default TemplateCard;
