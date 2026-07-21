import { Chip, Tooltip, Typography, type ChipProps } from "@mui/material";
import {
  type ComponentsOverrides,
  styled,
  useThemeProps,
} from "@mui/material/styles";
import type { ReactNode } from "react";
import {
  type FieldProps,
  sanitizeFieldRestProps,
  useRecordContext,
  useTranslate,
} from "react-admin";

const PREFIX = "RaTagField";

export const getTagColorSx = (color?: string): ChipProps["sx"] => {
  if (!color) return {};

  return {
    bgcolor: color,
    color: (theme) => theme.palette.getContrastText(color),
    "& .MuiChip-deleteIcon, & .MuiChip-avatar": {
      color: (theme) => theme.palette.getContrastText(color),
      opacity: 0.7,
      "&:hover": { opacity: 1 },
    },
  };
};

export interface TagFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType>,
  Omit<ChipProps, "label" | "children" | "color"> {
  children?: ReactNode;
  colorSource?: string;
  descriptionSource?: string;
  showColor?: boolean;
  showDescription?: boolean;
}

export const TagField = <
  RecordType extends Record<string, any> = Record<string, any>,
>(
  inProps: TagFieldProps<RecordType>
) => {
  const props = useThemeProps({
    props: inProps,
    name: PREFIX,
  });

  const {
    className,
    colorSource = "color",
    descriptionSource = "description",
    emptyText,
    showColor = true,
    showDescription = true,
    size = "small",
    source = "name",
    sx,
    ...rest
  } = props;

  const translate = useTranslate();
  const record = useRecordContext<RecordType>(props);
  const value = record?.[source];
  const color = record?.[colorSource];
  const description = record?.[descriptionSource];

  if (value == null || value === "") {
    if (!emptyText) return null;

    return (
      <Typography
        className={className}
        component="span"
        variant="body2"
        {...sanitizeFieldRestProps(rest)}
      >
        {translate(emptyText, { _: emptyText })}
      </Typography>
    );
  }

  const label = translate(`resources.tags.fields.${value}`, { _: value });
  const title = showDescription && description
    ? translate(`resources.tags.descriptions.${value}`, { _: description })
    : undefined;

  const chip = (
    <StyledChip
      className={className}
      label={label}
      size={size}
      sx={[showColor ? getTagColorSx(color) : {}, sx]}
      {...sanitizeFieldRestProps(rest)}
    />
  );

  return title ? <Tooltip title={title}>{chip}</Tooltip> : chip;
};

const StyledChip = styled(Chip, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  cursor: "pointer",
});

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey {
    [PREFIX]: "root";
  }

  interface ComponentsPropsList {
    [PREFIX]: Partial<TagFieldProps>;
  }

  interface Components {
    [PREFIX]?: {
      defaultProps?: ComponentsPropsList[typeof PREFIX];
      styleOverrides?: ComponentsOverrides<
        Omit<Theme, "components">
      >[typeof PREFIX];
    };
  }
}
