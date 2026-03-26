import { useState } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
  alpha,
} from "@mui/material";
import dogsData from "./public/data/dogs.json";
import { BREEDS, type BreedKey, type DogRecord } from "./types/dog";

const dogs = dogsData as DogRecord[];

const breedMeta: Record<
  BreedKey,
  { accent: string; wash: string; mood: string; summary: string }
> = {
  比熊: {
    accent: "#d9783d",
    wash: "#fff4e6",
    mood: "亲人柔软，适合把家里变成棉花糖气氛。",
    summary: "比熊组以陪伴感见长，适合偏好温和互动的家庭。",
  },
  边牧: {
    accent: "#5670d8",
    wash: "#edf1ff",
    mood: "聪明警觉，适合喜欢高互动与训练感的日常。",
    summary: "边牧组精力与学习力都很突出，适合活动量较高的家庭。",
  },
  泰迪: {
    accent: "#a55f4f",
    wash: "#fff1ec",
    mood: "灵活外向，整体气质更像会主动靠近人的小太阳。",
    summary: "泰迪组在亲近度与活泼感之间取得了很好的平衡。",
  },
  柯基: {
    accent: "#c46b1d",
    wash: "#fff4df",
    mood: "表情丰富，日常互动感很强，容易成为家中的焦点。",
    summary: "柯基组有稳定的陪伴感，也保留了鲜明个性。",
  },
  柴犬: {
    accent: "#b14d32",
    wash: "#fff0ea",
    mood: "独立里带一点倔强，适合喜欢慢慢培养默契的人。",
    summary: "柴犬组更强调性格魅力与建立关系后的信任感。",
  },
  米克斯: {
    accent: "#2f7d60",
    wash: "#edf9f3",
    mood: "生命经验更丰富，往往拥有很高的适应力。",
    summary: "米克斯组展现了救援犬最真实、也最耐看的个性层次。",
  },
  黄金猎犬: {
    accent: "#be8d17",
    wash: "#fff7df",
    mood: "稳定温暖，天生自带让空间松弛下来的气场。",
    summary: "黄金猎犬组拥有非常直观的治愈感与家庭友好度。",
  },
  拉布拉多: {
    accent: "#53655a",
    wash: "#eef4f0",
    mood: "可靠开朗，适合喜欢明确陪伴感与户外节奏的家庭。",
    summary: "拉布拉多组是兼具亲和力、体能与稳定性的经典选择。",
  },
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d3b2f",
    },
    secondary: {
      main: "#d9783d",
    },
    background: {
      default: "#f8f1e7",
      paper: "rgba(255, 251, 245, 0.84)",
    },
    text: {
      primary: "#1f241f",
      secondary: "#5a625c",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily:
      '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    h1: {
      fontFamily: '"Noto Serif TC", "PMingLiU", serif',
      fontSize: "clamp(3rem, 6vw, 5.4rem)",
      lineHeight: 1.02,
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontFamily: '"Noto Serif TC", "PMingLiU", serif',
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontFamily: '"Noto Serif TC", "PMingLiU", serif',
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.75,
    },
  },
});

function formatGender(gender: DogRecord["gender"]) {
  return gender === "male" ? "男生" : "女生";
}

function formatProcedure(done: boolean, positive: string, pending: string) {
  return done ? positive : pending;
}

function App() {
  const [selectedBreed, setSelectedBreed] = useState<BreedKey>(BREEDS[0]);

  const currentDogs = dogs.filter((dog) => dog.breed === selectedBreed);
  const currentMeta = breedMeta[selectedBreed];
  const cityCount = new Set(dogs.map((dog) => dog.city)).size;
  const vaccinatedCount = dogs.filter((dog) => dog.vaccinated).length;
  const neuteredCount = dogs.filter((dog) => dog.neutered).length;
  const averageAge = (
    dogs.reduce((sum, dog) => sum + dog.ageYears, 0) / dogs.length
  ).toFixed(1);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="page-shell">
        <Box className="page-orb page-orb-left" />
        <Box className="page-orb page-orb-right" />

        <Container maxWidth="xl" sx={{ position: "relative", py: { xs: 4, md: 6 } }}>
          <Box className="hero-layout">
            <Paper className="hero-panel" elevation={0}>
              <Stack spacing={3}>
                <Chip
                  icon={<AutoAwesomeRoundedIcon />}
                  label="Stray Dog Rescue / UI Preview"
                  sx={{
                    alignSelf: "flex-start",
                    borderRadius: "999px",
                    px: 1,
                    height: 36,
                    fontWeight: 700,
                    bgcolor: alpha("#ffffff", 0.72),
                    color: "primary.main",
                    backdropFilter: "blur(16px)",
                  }}
                />

                <Box>
                  <Typography variant="h1">
                    给等待家庭的狗狗，
                    <br />
                    一页更温柔的相遇。
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2.5,
                      maxWidth: 720,
                      fontSize: { xs: "1rem", md: "1.12rem" },
                      color: "text.secondary",
                    }}
                  >
                    这版首页先聚焦于救援犬资料展示：上方以品种切换浏览，下方用卡片呈现每只狗狗的个性、基础健康状态与所在城市，
                    让后续领养流程有一个稳定、清楚、可延伸的视觉基础。
                  </Typography>
                </Box>

                <Box className="hero-highlights">
                  <Paper elevation={0} className="highlight-card">
                    <Typography className="metric-label">目前可浏览</Typography>
                    <Typography className="metric-value">{dogs.length}</Typography>
                    <Typography className="metric-caption">只救援狗狗资料</Typography>
                  </Paper>
                  <Paper elevation={0} className="highlight-card">
                    <Typography className="metric-label">覆盖城市</Typography>
                    <Typography className="metric-value">{cityCount}</Typography>
                    <Typography className="metric-caption">个安置据点</Typography>
                  </Paper>
                  <Paper elevation={0} className="highlight-card">
                    <Typography className="metric-label">平均年龄</Typography>
                    <Typography className="metric-value">{averageAge}</Typography>
                    <Typography className="metric-caption">岁</Typography>
                  </Paper>
                </Box>
              </Stack>
            </Paper>

            <Paper
              className="insight-panel"
              elevation={0}
              sx={{
                borderColor: alpha(currentMeta.accent, 0.25),
                background: `linear-gradient(180deg, ${alpha(
                  currentMeta.wash,
                  0.9,
                )} 0%, rgba(255,255,255,0.82) 100%)`,
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography className="insight-label">本页聚焦品种</Typography>
                  <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "2.4rem", md: "3rem" } }}>
                    {selectedBreed}
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
                    {currentMeta.mood}
                  </Typography>
                </Box>

                <Divider />

                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PetsRoundedIcon sx={{ color: currentMeta.accent }} />
                    <Typography>
                      当前品种共有 <strong>{currentDogs.length}</strong> 只狗狗资料可浏览
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <VaccinesRoundedIcon sx={{ color: currentMeta.accent }} />
                    <Typography>
                      全站已有 <strong>{vaccinatedCount}</strong> 只完成疫苗纪录
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <MonitorHeartOutlinedIcon sx={{ color: currentMeta.accent }} />
                    <Typography>
                      已绝育纪录共 <strong>{neuteredCount}</strong> 只，利于后续领养说明扩充
                    </Typography>
                  </Stack>
                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 5,
                    bgcolor: alpha("#ffffff", 0.68),
                    border: `1px solid ${alpha(currentMeta.accent, 0.18)}`,
                  }}
                >
                  <Typography className="insight-label">品种导览摘要</Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary" }}>
                    {currentMeta.summary}
                  </Typography>
                </Paper>
              </Stack>
            </Paper>
          </Box>

          <Paper className="catalog-panel" elevation={0}>
            <Stack spacing={3}>
              <Box className="catalog-header">
                <Box>
                  <Typography className="section-kicker">Breed Directory</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
                    从品种分类进入，先看到每只狗狗真正的样子
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    maxWidth: 440,
                    color: "text.secondary",
                    fontSize: { xs: "0.98rem", md: "1rem" },
                  }}
                >
                  目前只做展示型首页，因此把焦点放在清楚阅读、节奏感和卡片密度；后续若加入领养流程，可以沿用这套结构继续扩充。
                </Typography>
              </Box>

              <Tabs
                value={selectedBreed}
                onChange={(_, nextBreed: BreedKey) => setSelectedBreed(nextBreed)}
                variant="scrollable"
                allowScrollButtonsMobile
                sx={{
                  minHeight: 0,
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                {BREEDS.map((breed) => {
                  const meta = breedMeta[breed];

                  return (
                    <Tab
                      key={breed}
                      value={breed}
                      label={breed}
                      sx={{
                        mr: 1.25,
                        minHeight: 0,
                        minWidth: 0,
                        px: 2.25,
                        py: 1.25,
                        borderRadius: "999px",
                        textTransform: "none",
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        color: "text.secondary",
                        border: `1px solid ${alpha(meta.accent, 0.18)}`,
                        backgroundColor:
                          selectedBreed === breed ? alpha(meta.accent, 0.12) : "transparent",
                        boxShadow:
                          selectedBreed === breed
                            ? `inset 0 0 0 1px ${alpha(meta.accent, 0.16)}`
                            : "none",
                      }}
                    />
                  );
                })}
              </Tabs>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
                  },
                  gap: 2,
                  alignItems: "stretch",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 6,
                    bgcolor: alpha(currentMeta.wash, 0.78),
                    border: `1px solid ${alpha(currentMeta.accent, 0.16)}`,
                  }}
                >
                  <Typography className="insight-label">当前分类说明</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                    {selectedBreed}资料墙
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
                    {currentMeta.summary} 这一区块维持高可读性，让使用者先快速判断气质、城市分布与基础照护状态。
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 6,
                    bgcolor: alpha("#ffffff", 0.76),
                    border: "1px solid rgba(59, 72, 64, 0.08)",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: alpha(currentMeta.accent, 0.14),
                        color: currentMeta.accent,
                        fontWeight: 700,
                      }}
                    >
                      {selectedBreed.slice(0, 1)}
                    </Avatar>
                    <Box>
                      <Typography className="insight-label">当前显示</Typography>
                      <Typography sx={{ fontSize: "1.05rem", fontWeight: 700 }}>
                        {currentDogs.length} 张狗狗卡片
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ mt: 2, color: "text.secondary" }}>
                    页面暂不提供领养按钮与筛选表单，先把资料展示密度、版面层级与视觉语气稳定下来。
                  </Typography>
                </Paper>
              </Box>

              <Box className="dog-grid">
                {currentDogs.map((dog) => (
                  <Card
                    key={dog.id}
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
                            <MonitorHeartOutlinedIcon
                              sx={{ fontSize: 19, color: currentMeta.accent }}
                            />
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
                ))}
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
