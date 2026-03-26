import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";
import type { DogRecord } from "../../types/dog";
import { formatGender, formatProcedure } from "../../utils/dogFormat";

export function DogCard({ dog }: { dog: DogRecord }) {
  const { currentMeta } = useDogCatalog();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 7,
        border: `1px solid ${alpha(currentMeta.accent, 0.14)}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(253,249,244,0.96) 100%)",
        boxShadow: "0 24px 60px rgba(73, 53, 28, 0.08)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.25}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  bgcolor: alpha(currentMeta.accent, 0.14),
                  color: currentMeta.accent,
                  fontWeight: 800,
                }}
              >
                {dog.name.slice(0, 1)}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: "1.24rem", fontWeight: 800 }}>
                  {dog.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
                  {dog.breed} / {formatGender(dog.gender)}
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="开放认养"
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: alpha(currentMeta.accent, 0.12),
                color: currentMeta.accent,
              }}
            />
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip
              label={dog.personality}
              size="small"
              sx={{ bgcolor: alpha(currentMeta.accent, 0.08) }}
            />
            <Chip label={`${dog.ageYears} 岁`} size="small" variant="outlined" />
            <Chip label={`${dog.weightKg} kg`} size="small" variant="outlined" />
          </Stack>

          <Typography sx={{ color: "text.secondary", minHeight: 84 }}>
            {dog.description}
          </Typography>

          <Stack spacing={1.25}>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <FmdGoodOutlinedIcon sx={{ fontSize: 19, color: currentMeta.accent }} />
              <Typography sx={{ fontSize: "0.95rem" }}>{dog.city}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <VaccinesRoundedIcon sx={{ fontSize: 19, color: currentMeta.accent }} />
              <Typography sx={{ fontSize: "0.95rem" }}>
                {formatProcedure(dog.vaccinated, "已完成疫苗纪录", "待补疫苗纪录")}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <MonitorHeartOutlinedIcon sx={{ fontSize: 19, color: currentMeta.accent }} />
              <Typography sx={{ fontSize: "0.95rem" }}>
                {formatProcedure(dog.neutered, "已完成绝育", "绝育状态待更新")}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Typography sx={{ fontSize: "0.92rem", color: "text.secondary" }}>
            毛色：{dog.coatColor}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
