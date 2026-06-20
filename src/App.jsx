import { useState, useCallback, useEffect, useMemo } from "react";

// Accent color options
const ACCENT_COLORS = {
  orange: "#FF4D00",
  blue: "#00D4FF",
  purple: "#8B5CF6",
  green: "#38B56A",
};

// Theme display names
const THEME_NAMES = {
  orange: "🏀 Classic Dunk Lab",
  blue: "🌊 Ocean Blue",
  purple: "⚡ Electric Purple",
  green: "💎 Emerald Green",
};

// Generate workout colors based on theme
const getWorkoutColors = (accentColor) => {
  const base = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  
  // For orange theme, keep original behavior but swap vertical to blue
  if (accentColor === "orange") {
    return {
      jump: C.orange,
      strength: C.purple,
      speed: C.gold,
      vertical: "#0077D6",  // Blue
    };
  }
  
  // For other themes, use theme-based variants with visual distinction
  // Using different shades, opacity levels, and brightness
  if (accentColor === "blue") {
    return {
      jump: base,              // #00D4FF - main accent
      strength: "#0066CC",    // darker blue
      speed: "#66E0FF",        // lighter blue
      vertical: "#00D4FF",     // Cyan instead of very dark blue
    };
  }
  
  if (accentColor === "purple") {
    return {
      jump: base,              // #8B5CF6 - main accent
      strength: "#8B5CF6",     // brighter purple (same as accent for consistency)
      speed: "#C4B5FD",        // lighter purple
      vertical: "#7C3AED",     // medium purple (brighter than before)
    };
  }
  
  if (accentColor === "green") {
    return {
      jump: base,              // #38B56A - main accent
      strength: "#38B56A",     // brighter green (same as accent for consistency)
      speed: "#6EE7B7",        // lighter green
      vertical: "#10B981",     // medium green (brighter than before)
    };
  }
  
  // Fallback to orange
  return {
    jump: C.orange,
    strength: C.purple,
    speed: C.gold,
    vertical: C.cyan,
  };
};

// Generate WORKOUTS array with dynamic colors
const getWorkouts = (accentColor) => {
  const colors = getWorkoutColors(accentColor);
  
  return [
    {title:"JUMP TRAINING",  color:colors.jump, est:"20 min",
     warmup:"High knees 30s · Leg swings 10/side · Jump rope 60s",
     cool:"Calf stretch 60s · Quad stretch 30s/side · Hip flexor 45s",
     drills:[
      {name:"Box Jumps",         sets:4,reps:"6",  tip:"Land soft — reset fully before each rep",
       how:"Stand in front of a box at knee height. Jump onto it with both feet. Land softly with knees bent. Step down (don't jump down). Repeat.",
       focus:"Explosive hip extension. Soft landings to protect joints. Full reset between reps.",
       why:"Builds explosive power and teaches proper landing mechanics essential for jumping."},
      {name:"Depth Drops",       sets:3,reps:"8",  tip:"Step off, absorb on contact — trains elasticity",
       how:"Stand on a box 12-18 inches high. Step off (don't jump). Land and immediately jump as high as possible. Reset and repeat.",
       focus:"Absorb impact with legs. Immediate explosive jump upon landing. Minimize ground contact time.",
       why:"Trains the stretch-shortening cycle — your tendons' ability to store and release elastic energy for higher jumps."},
      {name:"Broad Jumps",       sets:3,reps:"5",  tip:"Full arm drive, maximum horizontal distance",
       how:"Start in athletic stance. Swing arms back, then explosively jump forward. Land softly with knees bent. Measure distance. Reset fully between reps.",
       focus:"Maximum horizontal distance. Arm swing coordination. Soft, controlled landings.",
       why:"Develops horizontal power that transfers to vertical jumping. Improves coordination and explosive force production."},
      {name:"Jump Rope Fast",    sets:3,reps:"60s",tip:"Forefoot only — minimal contact time",
       how:"Jump rope at maximum speed. Stay on balls of feet. Keep jumps small and quick. Maintain rhythm for the full duration.",
       focus:"Fast foot turnover. Staying on forefoot. Minimal ground contact time.",
       why:"Improves foot speed, calf strength, and coordination — all critical for quick, explosive movements."},
      {name:"Approach Jumps",    sets:3,reps:"5",  tip:"2-step gather, reach max every rep",
       how:"Take 2-3 steps to build momentum, gather your feet, and jump as high as possible reaching with one hand. Land softly. Reset between reps.",
       focus:"Approach speed. Footwork timing. Maximum height on every attempt.",
       why:"Simulates game-like jumping conditions. Builds the approach mechanics used in actual dunk attempts."},
     ]},
    {title:"STRENGTH DAY",   color:colors.strength, est:"22 min",
     warmup:"Glute bridges ×15 · Monster walks ×20 · Hip circles",
     cool:"Deep squat hold 60s · Lizard stretch 60s/side · Hamstring stretch",
     drills:[
      {name:"Goblet Squat",          sets:4,reps:"8",   tip:"Full depth, chest up, elbows inside knees",
       how:"Hold a dumbbell at chest height with both hands. Squat down until thighs are parallel to floor. Keep chest up and elbows inside knees. Drive through heels to stand.",
       focus:"Full depth squat. Upright torso. Heels driving into ground.",
       why:"Builds leg strength and squat pattern. Essential foundation for explosive jumping power."},
      {name:"Bulgarian Split Squat", sets:3,reps:"8/s", tip:"Upright torso — slow down, explode up",
       how:"Place one foot on a bench behind you. Lower into a lunge until back knee nearly touches ground. Drive through front heel to stand. Keep torso upright throughout.",
       focus:"Upright torso. Controlled descent. Explosive drive up through front heel.",
       why:"Builds single-leg strength and fixes imbalances. Critical for jumping off one foot."},
      {name:"Hip Thrust",            sets:4,reps:"12",  tip:"Full extension, hard glute squeeze",
       how:"Lean upper back against a bench. Feet flat on floor, knees bent. Lower hips, then drive them up by squeezing glutes hard at the top. Hold briefly, then lower.",
       focus:"Full hip extension. Hard glute squeeze at top. Controlled tempo.",
       why:"Hip strength directly powers vertical jumps. Glutes are your primary jumping muscles."},
      {name:"Single-Leg Calf Raise", sets:3,reps:"15/s",tip:"Full range — this is your spring",
       how:"Stand on edge of a step on one foot. Lower heel below step, then rise up onto toes as high as possible. Hold at top, then lower slowly. Use wall for balance if needed.",
       focus:"Full range of motion. Slow controlled eccentric. Hold at peak contraction.",
       why:"Achilles tendon is your spring. Strong calves = more elastic energy for higher jumps."},
      {name:"Tuck Jumps",            sets:3,reps:"8",   tip:"Drive knees to chest, land light",
       how:"Start in athletic stance. Jump explosively and bring knees to chest in mid-air. Land softly on balls of feet. Immediately reset and repeat.",
       focus:"Maximum height. Knees to chest. Soft, quiet landings.",
       why:"Develops explosive leg power and teaches quick ground contact times essential for jumping."},
     ]},
    {title:"SPEED & AGILITY", color:colors.speed, est:"18 min",
     warmup:"Butt kicks 30s · High knees 30s · Lateral shuffles 20s",
     cool:"Hip flexor 45s/side · IT band stretch · Walk 2 min",
     drills:[
      {name:"Sprint Starts 10yd",    sets:6,reps:"1",  tip:"Lean forward, drive your arms first",
       how:"Start in athletic stance. On command, explode forward driving arms hard. Accelerate for 10 yards at maximum effort. Walk back to recover. Repeat.",
       focus:"Explosive first step. Arm drive. Low body angle at start.",
       why:"Develops acceleration and explosive power off the ground — critical for jump takeoff."},
      {name:"Lateral Shuffle",       sets:4,reps:"30s",tip:"Stay low — feet never cross",
       how:"Start in athletic stance. Shuffle laterally to the right, keeping feet shoulder-width apart and never crossing. Stay low with knees bent. Shuffle back left. Repeat for 30 seconds.",
       focus:"Stay in athletic stance. Feet never cross. Quick lateral movement.",
       why:"Builds lateral quickness and hip stability — important for defensive movements and change of direction."},
      {name:"5-10-5 Drill",          sets:5,reps:"1",  tip:"Plant hard on every cut",
       how:"Start at middle cone. Sprint 5 yards right, touch line. Sprint 10 yards left, touch line. Sprint 5 yards back to start. Plant hard and change direction quickly at each turn.",
       focus:"Explosive cuts. Hard plants. Quick change of direction.",
       why:"Trains acceleration, deceleration, and change of direction — essential for basketball agility."},
      {name:"Reactive Backpedal",    sets:4,reps:"20s",tip:"Eyes forward, quick drop step",
       how:"Start facing forward. On command, quickly drop step and backpedal explosively. Keep eyes forward, hips low. After 20 seconds, sprint forward to return.",
       focus:"Quick transition to backpedal. Stay low. Eyes always forward.",
       why:"Builds defensive footwork and ability to change direction quickly while maintaining vision."},
      {name:"Approach Jumps",        sets:3,reps:"5",  tip:"Full speed 2-step — game realistic",
       how:"Take 2-3 running steps to build momentum, gather your feet, and jump as high as possible reaching with one hand. Land softly. Reset fully between reps.",
       focus:"Approach speed. Footwork timing. Maximum height on every attempt.",
       why:"Simulates game-like jumping conditions. Builds the approach mechanics used in actual dunk attempts."},
     ]},
    {title:"VERTICAL FOCUS",  color:colors.vertical, est:"24 min",
     warmup:"Jump rope 2 min · Ankle circles · Dynamic hip stretch",
     cool:"Calf stretch 60s · Pigeon pose 60s/side · Child's pose",
     drills:[
      {name:"Max Vertical Test",     sets:1,reps:"5 jumps",tip:"Mark the wall — record your peak",
       how:"Stand next to a wall with chalk on your hand. Jump as high as possible and mark the wall at your peak. Measure from standing reach to mark. Take 5 attempts, record your best.",
       focus:"Maximum effort on every jump. Proper arm swing. Full extension.",
       why:"Establishes your baseline vertical. Essential for tracking progress over time."},
      {name:"Squat Jump Series",     sets:4,reps:"8",  tip:"No pause at bottom — continuous rhythm",
       how:"Start in athletic stance. Squat down slightly, then immediately explode upward. Land softly and immediately go into the next rep without pausing. Keep rhythm continuous.",
       focus:"No pause between reps. Explosive upward movement. Soft landings.",
       why:"Trains reactive power and the ability to generate force quickly from a loaded position."},
      {name:"Ankle Stiffness Hops",  sets:3,reps:"20", tip:"Minimal ground time — you're a spring",
       how:"Stand with feet shoulder-width apart. Hop quickly on balls of feet with minimal knee bend. Keep ground contact time as short as possible. Stay on toes throughout.",
       focus:"Minimal ground contact. Stay on forefoot. Quick, bouncy hops.",
       why:"Develops ankle stiffness and tendon elasticity — your Achilles tendon acts like a spring for jumping."},
      {name:"Single-Leg Jumps",      sets:3,reps:"6/s",tip:"Fix weak-side imbalance",
       how:"Stand on one leg. Jump as high as possible, landing on the same leg. Keep balance throughout. Complete all reps on one leg, then switch to the other.",
       focus:"Maximum height on each jump. Balanced landings. Equal effort on both legs.",
       why:"Identifies and fixes strength imbalances between legs. Critical for one-footed jumping."},
      {name:"Dunk Approach ×8",      sets:4,reps:"8",  tip:"Every rep — visualize clearing the rim",
       how:"Take 2-3 running steps to build momentum, gather your feet, and jump as high as possible reaching with one hand toward a rim target. Land softly. Reset fully between reps.",
       focus:"Approach speed. Footwork timing. Visualize clearing the rim on every attempt.",
       why:"Builds the specific approach mechanics and confidence needed for actual dunk attempts."},
     ]},
  ];
};

const C = {
  bg:"#07070D", card:"#0E0E16", border:"#1C1C2A",
  orange:"#FF4D00", gold:"#FFB800", cyan:"#00D4FF",
  green:"#38B56A", purple:"#8B5CF6", red:"#F03A5A",
  muted:"#B8B8D0",   // secondary text - medium contrast, immediately readable
  dim:"#12121A",
  label:"#A0A0B8",   // helper text - readable but subdued
};

const RANKS = [
  {name:"PROSPECT",   min:0,     color:"#999999",    icon:"🌱"},
  {name:"ROOKIE",     min:150,   color:"#AAAAAA",    icon:"👟"},
  {name:"VARSITY",    min:400,   color:"#BBBBBB",    icon:"📋"},
  {name:"STARTER",    min:900,   color:"#C8A55A", icon:"⭐"},
  {name:"ALL-STAR",   min:1800,  color:"#FFB800", icon:"✨"},
  {name:"ELITE",      min:3500,  color:"#00D4FF", icon:"💎"},
  {name:"D1 LEVEL",  min:6000,  color:"#8B5CF6", icon:"🔮"},
  {name:"HOOPER",     min:9500,  color:"#FF4D00", icon:"🔥"},
  {name:"LEGEND",     min:14000, color:"#FF0040", icon:"👑"},
];

const LEVELS = [
  {id:1,label:"Can't Touch Net",  vert:17,icon:"🪑",color:"#FFB800"},
  {id:2,label:"Touches Net",      vert:19,icon:"🤏",color:"#FFB800"},
  {id:3,label:"Touches Backboard",vert:22,icon:"📋",color:"#FFB800"},
  {id:4,label:"Touches Rim",      vert:24,icon:"🤙",color:"#FF4D00"},
  {id:5,label:"Grabs Rim",        vert:26,icon:"✊",color:"#FF4D00"},
  {id:6,label:"Hangs on Rim",     vert:28,icon:"⭐",color:"#FF4D00"},
  {id:7,label:"Almost Dunking",   vert:30,icon:"🔥",color:"#FF0040"},
  {id:8,label:"CAN DUNK",         vert:32,icon:"👑",color:"#FFD700"},
];

const PRO_WEEKS = [
  {week:"WEEK 1–2",phase:"FOUNDATION",color:C.orange,note:"Reactive strength base. Form over intensity.",drills:[
    {name:"Altitude Drop → Jump", sets:5,reps:"5",  tip:"Drop 18\", explode instantly on contact",
     how:"Stand on a box 18 inches high. Step off (don't jump). Land and immediately jump as high as possible. Reset and repeat.",
     focus:"Absorb impact on landing. Immediate explosive jump. Minimize ground contact.",
     why:"Trains reactive strength — your ability to use elastic energy from tendons for explosive power."},
    {name:"Single-Leg Bounds",    sets:4,reps:"6/s",tip:"Drive knee hard, cycle arms aggressively",
     how:"Jump forward explosively on one leg, driving the opposite knee forward. Land on the same leg and immediately bound again. Switch legs after completing reps.",
     focus:"Maximum distance per bound. Aggressive arm swing. Explosive knee drive.",
     why:"Builds single-leg power and coordination — essential for one-footed jumping and takeoff."},
    {name:"Weighted Jump Squat",  sets:4,reps:"6",  tip:"10–15% bodyweight — speed over load",
     how:"Hold dumbbells at your sides. Squat down slightly, then jump explosively. Land softly and immediately go into the next rep. Keep weight light to maintain speed.",
     focus:"Explosive upward movement. Quick ground contact. Speed over heavy load.",
     why:"Adds resistance to jump training to build power without sacrificing speed or technique."},
    {name:"Ankle Stiffness Hops", sets:3,reps:"20", tip:"Tendons = your spring, not muscles",
     how:"Stand with feet shoulder-width apart. Hop quickly on balls of feet with minimal knee bend. Keep ground contact time as short as possible. Stay on toes throughout.",
     focus:"Minimal ground contact. Stay on forefoot. Quick, bouncy hops.",
     why:"Develops ankle stiffness and tendon elasticity — your Achilles tendon acts like a spring for jumping."},
    {name:"Hip Thrust",           sets:5,reps:"6",  tip:"Hip strength directly drives vertical",
     how:"Lean upper back against a bench. Feet flat on floor, knees bent. Lower hips, then drive them up by squeezing glutes hard at the top. Hold briefly, then lower.",
     focus:"Full hip extension. Hard glute squeeze at top. Controlled tempo.",
     why:"Hip strength directly powers vertical jumps. Glutes are your primary jumping muscles."},
  ]},
  {week:"WEEK 3–4",phase:"OVERLOAD",color:C.cyan,note:"More volume, more load. Body is adapting — push it.",drills:[
    {name:"Drop Jump (faster)",   sets:6,reps:"5",  tip:"Shorter contact time than Week 1",
     how:"Stand on a box 18-24 inches high. Step off (don't jump). Land and immediately jump as high as possible with minimal ground contact. Reset and repeat.",
     focus:"Extremely fast ground contact. Immediate explosive jump. Absorb and react.",
     why:"Progressive overload on reactive strength — trains faster tendon response for more explosive jumps."},
    {name:"Bounding 30m",         sets:5,reps:"1",  tip:"Maximum effort every single bound",
     how:"Run forward bounding explosively on each step, driving knees high and swinging arms aggressively. Cover 30 meters with maximum effort on every bound.",
     focus:"Maximum distance per bound. Aggressive arm swing. Explosive knee drive.",
     why:"Builds horizontal power that transfers to vertical jumping. Improves coordination and explosive force production."},
    {name:"Heavy Hip Thrust",     sets:5,reps:"4",  tip:"Heavier than last week",
     how:"Lean upper back against a bench. Feet flat on floor, knees bent. Use heavier weight than Week 1-2. Lower hips, then drive them up by squeezing glutes hard at the top.",
     focus:"Full hip extension. Hard glute squeeze. Progressive overload.",
     why:"Strength progression builds more force production capacity for explosive jumping."},
    {name:"Box Squat",            sets:5,reps:"4",  tip:"Pause on box, then explode",
     how:"Squat down until sitting on a box or bench behind you. Pause briefly, then explode up to standing. Keep chest up throughout.",
     focus:"Pause on box to eliminate momentum. Explosive drive up. Maintain upright torso.",
     why:"Builds explosive hip power by removing the stretch reflex — trains pure strength and force production."},
    {name:"Nordic Curl",          sets:3,reps:"5",  tip:"Slow eccentric — hamstring protection",
     how:"Kneel with feet anchored. Lower your upper body slowly toward the ground using hamstrings to resist. Go as low as possible, then use hands to push back up.",
     focus:"Slow controlled descent. Resist gravity with hamstrings. Don't collapse.",
     why:"Builds eccentric hamstring strength — critical for injury prevention and deceleration control."},
  ]},
  {week:"WEEK 5–6",phase:"PEAK",color:"#FF0040",note:"Max intensity. Dunk attempts every session. Test your numbers.",drills:[
    {name:"Max Effort Jumps",     sets:6,reps:"3",  tip:"Full rest between — quality only",
     how:"Jump as high as possible with maximum effort. Take full rest (2-3 minutes) between each jump. Focus on quality over quantity. Record your best height.",
     focus:"Maximum effort on every jump. Full recovery between reps. Perfect technique.",
     why:"Peak phase focuses on quality and maximum output — tests your true explosive power potential."},
    {name:"Dunk Approach Test",   sets:5,reps:"3",  tip:"Full speed, go for the rim every rep",
     how:"Take full running approach and jump as high as possible toward a rim target. Go for the dunk on every attempt. Full rest between reps.",
     focus:"Full approach speed. Dunk attempt on every rep. Maximum height.",
     why:"Simulates actual dunk conditions. Builds confidence and tests your game-ready jumping ability."},
    {name:"Vertical Benchmark",   sets:1,reps:"5",  tip:"Mark the wall — compare to Week 1",
     how:"Stand next to a wall with chalk on your hand. Jump as high as possible and mark the wall at your peak. Measure from standing reach to mark. Compare to Week 1 baseline.",
     focus:"Maximum effort. Proper measurement. Compare to starting point.",
     why:"Tests your progress over the 6-week program. Shows the effectiveness of your training."},
    {name:"40yd Sprint Test",     sets:3,reps:"1",  tip:"Time yourself — benchmark improvement",
     how:"Sprint 40 yards at maximum effort. Have someone time you or use a timer. Take full rest between attempts. Record your best time.",
     focus:"Maximum acceleration. Top speed. Proper sprint mechanics.",
     why:"Tests overall explosiveness and power transfer. Improvements correlate with vertical jump gains."},
    {name:"Hip Thrust Max",       sets:3,reps:"3",  tip:"New 3RM — show your strength gains",
     how:"Lean upper back against a bench. Use your heaviest weight for 3 reps. Lower hips, then drive them up by squeezing glutes hard. Full rest between sets.",
     focus:"Maximum weight for 3 reps. Perfect form. Full hip extension.",
     why:"Tests strength gains from the program. Hip strength directly correlates with vertical jumping power."},
  ]},
];

const CHALLENGES = [
  {label:"Touch the rim 3 times",       icon:"🤙",xp:30},
  {label:"Do 25 jump squats",            icon:"⬆️",xp:25},
  {label:"Beat your last sprint",        icon:"⚡",xp:25},
  {label:"Make 40 shots in a row",       icon:"◎", xp:35},
  {label:"Complete workout + cool down", icon:"✓", xp:40},
  {label:"10 min warmup + stretch",      icon:"🔥",xp:20},
  {label:"20 min dribbling drills",      icon:"🏀",xp:25},
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const SK    = "dunklab-v10";
const load  = () => { try { return JSON.parse(localStorage.getItem(SK)) || {}; } catch { return {}; } };
const save  = d  => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };
const today = () => new Date().toISOString().slice(0,10);
const prevDay = iso => { const d = new Date(iso); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); };
const fmtDate = iso => new Date(iso).toLocaleDateString("en-US", {month:"short",day:"numeric"});
const pick  = arr => arr[Math.floor(Math.random() * arr.length)];

function calcStreak(days=[]) {
  if (!days.length) return 0;
  const s = [...new Set(days)].sort().reverse();
  let n = 0, cur = today();
  for (const d of s) {
    if (d === cur) { n++; cur = prevDay(cur); }
    else break; // any gap breaks the streak
  }
  return n;
}
function getRank(xp) { let r = RANKS[0]; for (const x of RANKS) { if (xp >= x.min) r = x; } return r; }
function rankIndex(xp) { let i = 0; for (let j = 0; j < RANKS.length; j++) { if (xp >= RANKS[j].min) i = j; } return i; }
function hasRank(xp, name) { return rankIndex(xp) >= RANKS.findIndex(r => r.name === name); }
function xpProg(xp) {
  const i = RANKS.findIndex(r => r.min > xp);
  if (i <= 0) return {pct:100, needed:0, next:"MAX"};
  return {pct:Math.round(((xp-RANKS[i-1].min)/(RANKS[i].min-RANKS[i-1].min))*100), needed:RANKS[i].min-xp, next:RANKS[i].name};
}
// ─── STANDING REACH + MILESTONE SOURCE OF TRUTH ──────────────────────────────
// Rim = 120". A milestone's required vertical = 120 - effectiveReach + extra,
// where `extra` is how far above (+) or below (-) the rim the hand must reach.
const RIM_HEIGHT   = 120;
const REACH_RATIO  = 1.335;          // standing reach ≈ height * 1.335
const DEFAULT_HEIGHT = 66;           // 5'6" fallback when height is unknown
const DEFAULT_REACH  = Math.round(DEFAULT_HEIGHT * REACH_RATIO); // 88"
const MIN_VERT  = 1;                 // never show a non-positive target
const MIN_STEP  = 1;                 // each milestone strictly exceeds the previous
// Numeric milestones start at level 3 (Touches Net). Levels 1–2 stay descriptive.
const EXTRA_NEEDED = { 3:-14, 4:-6, 5:0, 6:3, 7:5, 8:8, 9:10 };
// Map LEVELS ids (1–8) onto the EXTRA_NEEDED scale. LEVELS:
//   1 Can't Touch Net (descriptive), 2 Touches Net, 3 Touches Backboard,
//   4 Touches Rim, 5 Grabs Rim, 6 Hangs on Rim, 7 Almost Dunking, 8 CAN DUNK.
const LEVEL_EXTRA = { 1:null, 2:-14, 3:-6, 4:0, 5:3, 6:5, 7:8, 8:10 };

// Parse + validate an inches value; returns a clamped number or null.
const parseInches = (val, min, max) => {
  const n = parseFloat(val);
  if (!Number.isFinite(n)) return null;
  if (n < min || n > max) return null;
  return n;
};

// Resolve the reach to use: measured standingReach > derived from height > default.
const effectiveReach = (height, standingReach) => {
  const h = parseInches(height, 48, 96);
  const r = parseInches(standingReach, 60, 130);
  // Measured reach only trusted if it's physically plausible vs height.
  if (r !== null && (h === null || r >= h)) return r;
  if (h !== null) return Math.round(h * REACH_RATIO);
  return DEFAULT_REACH;
};

// Build a strictly-increasing target table for LEVELS ids 1–8.
// Levels with a null extra (id 1) have no numeric target (descriptive only).
function levelTable(height, standingReach) {
  const reach = effectiveReach(height, standingReach);
  const out = {};
  let prev = null;
  for (let id = 1; id <= 8; id++) {
    const extra = LEVEL_EXTRA[id];
    if (extra === null || extra === undefined) { out[id] = null; continue; }
    let target = Math.max(MIN_VERT, RIM_HEIGHT - reach + extra);
    if (prev !== null) target = Math.max(target, prev + MIN_STEP); // enforce monotonicity
    out[id] = target;
    prev = target;
  }
  return out;
}

// Required vertical for a single level id, reach-adjusted. Falls back to the
// static LEVELS[].vert when no numeric target exists (descriptive levels).
function levelVert(levelId, height, standingReach) {
  const t = levelTable(height, standingReach)[levelId];
  if (t !== null && t !== undefined) return t;
  const lv = LEVELS.find(l => l.id === levelId);
  return lv ? lv.vert : MIN_VERT;
}

// Highest level id whose reach-adjusted target the given vertical clears.
function levelForVert(vert, height, standingReach) {
  const table = levelTable(height, standingReach);
  let best = 1;
  for (let id = 2; id <= 8; id++) {
    const t = table[id];
    if (t !== null && t !== undefined && vert >= t) best = id;
  }
  return best;
}

const sReach    = (h, sr) => effectiveReach(h, sr);
const gapFn     = (h,v,sr) => Math.max(0, RIM_HEIGHT - sReach(h, sr) - v);
const dunkPctFn = (h,v,sr) => { const denom = RIM_HEIGHT-sReach(h, sr); if(!denom||isNaN(denom)||isNaN(v)) return 3; return Math.min(100, Math.max(3, Math.round((v/denom)*100))); };
const weeksEst  = g => g <= 0 ? 0 : Math.ceil(g / 0.32);

function RankCard({r,cur,un,p,reward}) {
  const [hov,setHov]=useState(false);
  return (
    <div
      className="rankcard"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:cur?`${r.color}14`:"#0E0E16",
        border:`1px solid ${hov?r.color+(cur?"CC":"66"):cur?r.color+"66":"#1C1C2A"}`,
        borderRadius:7,padding:"10px 12px",display:"flex",alignItems:"flex-start",
        gap:10,opacity:un?1:.35,marginBottom:5,transition:"all .2s",
        boxShadow:hov?`0 0 16px ${r.color}${cur?"44":"22"}`:"none",
      }}
    >
      <span style={{fontSize:16,minWidth:20,marginTop:1}}>{r.icon}</span>
      <div style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:cur?r.color:hov&&un?"#F0F0F0":"#D0D0D0",letterSpacing:".05em"}}>{r.name}</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted}}>{r.min.toLocaleString()} XP</span>
        </div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:cur?r.color:un?C.label:C.muted,marginTop:2,lineHeight:1.4}}>{reward}</div>
        {cur&&(
          <div style={{marginTop:6}}>
            <div style={{height:3,background:"#1A1A26",borderRadius:2,marginBottom:3}}>
              <div style={{height:3,width:`${p.pct}%`,background:r.color,borderRadius:2,transition:"width .6s"}}/>
            </div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:r.color}}>{p.pct}% to {p.next}</div>
          </div>
        )}
      </div>
      {un&&!cur&&<span style={{color:"#38B56A",fontSize:13,marginTop:2}}>✓</span>}
    </div>
  );
}

function BadgeCard({b}) {
  const [hov,setHov]=useState(false);
  return (
    <div
      className="badgecard"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:b.unlocked?`#FFB80012`:"#0E0E16",
        border:`1px solid ${hov?(b.unlocked?"#FFB800":"#FF4D0088"):b.unlocked?"#FFB80055":"#1C1C2A"}`,
        borderRadius:7,padding:"11px 11px",opacity:b.unlocked?1:.4,
        position:"relative",
        boxShadow:hov?(b.unlocked?`0 0 14px #FFB80044`:`0 0 10px #FF4D0022`):"none",
      }}
    >
      {b.unlocked&&<div style={{position:"absolute",top:7,right:8,fontSize:10}}>✓</div>}
      <div style={{fontSize:22,marginBottom:4}}>{b.icon}</div>
      <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:13,letterSpacing:".04em",marginBottom:1}}>{b.label}</div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,marginBottom:3}}>{b.desc}</div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:b.unlocked?"#38B56A":C.muted}}>{b.unlocked?"✓ EARNED":b.reward}</div>
    </div>
  );
}

function DrillInstructions({drill, accentColor}) {
  const [expanded, setExpanded] = useState(false);
  if (!drill.how) return null;
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  return (
    <div style={{marginTop:8}}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background:expanded ? `${accent}22` : C.dim,
          border:`1px solid ${expanded ? accent : C.border}`,
          borderRadius:5,
          padding:"6px 10px",
          fontSize:11,
          color:expanded ? accent : C.muted,
          fontFamily:"'DM Mono',monospace",
          cursor:"pointer",
          display:"flex",
          alignItems:"center",
          gap:6,
          transition:"all .15s"
        }}
      >
        <span>ℹ️</span>
        <span>{expanded ? "Hide instructions" : "How to do this"}</span>
      </button>
      {expanded && (
        <div style={{marginTop:8,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}>
          <div style={{marginBottom:8}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:accent,letterSpacing:".08em",marginBottom:3}}>HOW</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.5}}>{drill.how}</div>
          </div>
          <div style={{marginBottom:8}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:accent,letterSpacing:".08em",marginBottom:3}}>FOCUS</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.5}}>{drill.focus}</div>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:accent,letterSpacing:".08em",marginBottom:3}}>WHY</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.5}}>{drill.why}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function spawnXP(n) {
  const el = document.createElement("div");
  el.className = "xpfloat"; el.textContent = `+${n} XP`;
  el.style.left = `${25 + Math.random()*50}%`; el.style.top = "30%";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1050);
}

// ─── LIVE COACH ENGINE ────────────────────────────────────────────────────────
// Builds a full data snapshot of the user's current state
function snapshot(raw) {
  const days  = raw.activeDays || [];
  const verts = raw.vertLogs   || [];
  const h     = parseFloat(raw.height) || DEFAULT_HEIGHT;
  const sr    = raw.standingReach;
  const lvId  = raw.level || 3;
  const curLvVert = levelVert(lvId, h, sr);
  const lastV  = verts.length ? verts[verts.length-1].v : null;
  const bestV  = verts.length ? Math.max(...verts.map(v => v.v)) : null;
  const effV   = lastV || curLvVert;
  const gap    = gapFn(h, effV, sr);
  const streak = calcStreak(days);
  const sessions = days.length;

  const wkAgo = new Date(); wkAgo.setDate(wkAgo.getDate() - 7);
  const moAgo = new Date(); moAgo.setDate(moAgo.getDate() - 30);
  const wkLogs = verts.filter(l => new Date(l.date) > wkAgo);
  const moLogs = verts.filter(l => new Date(l.date) > moAgo);
  const wkSess = days.filter(d => new Date(d) > wkAgo).length;

  const weeklyGain  = wkLogs.length >= 2 ? +(wkLogs[wkLogs.length-1].v - wkLogs[0].v).toFixed(1) : null;
  const monthlyGain = moLogs.length >= 2 ? +(moLogs[moLogs.length-1].v - moLogs[0].v).toFixed(1) : null;

  let lastDaysAgo = null;
  if (days.length) {
    const sorted = [...days].sort().reverse();
    lastDaysAgo = Math.floor((new Date(today()) - new Date(sorted[0])) / 86400000);
  }

  // Trend detection
  let trend = "unknown";
  if (verts.length >= 4) {
    const half = Math.floor(verts.length / 2);
    const a1 = verts.slice(0, half).reduce((s,v) => s+v.v, 0) / half;
    const a2 = verts.slice(half).reduce((s,v) => s+v.v, 0) / (verts.length - half);
    trend = a2 - a1 > 0.3 ? "improving" : a2 - a1 < -0.2 ? "declining" : "plateau";
  }

  // Sessions per week average
  const weeksSinceStart = sessions > 0 ? Math.max(1, Math.ceil((new Date() - new Date(days[0])) / (7*86400000))) : 1;
  const avgPerWeek = +(sessions / weeksSinceStart).toFixed(1);

  return { gap, streak, sessions, lastV, bestV, effVert: effV, weeklyGain, monthlyGain,
           wkSess, lastDaysAgo, trend, wkEst: weeksEst(gap), avgPerWeek, h };
}

// ─── COACH MESSAGE GENERATOR ──────────────────────────────────────────────────
// Each type has multiple variations to avoid repetition
function coachMsg(s, mode) {
  const { gap, streak, sessions, lastV, bestV, weeklyGain, monthlyGain,
          wkSess, lastDaysAgo, trend, wkEst, avgPerWeek } = s;

  // ── TRIGGER MODES ─────────────────────────────────────────────────────────
  if (mode?.type === "post_workout") {
    const { done, total } = mode;
    const p = Math.round((done/total)*100);
    if (p === 100) return pick([
      `${done}/${total} drills. That's a complete session. That's how ${gap}" closes.`,
      `Perfect. ${total} drills, no skips. Do that every day and the rim comes to you.`,
      `Full session. You're in the ${streak > 3 ? `${streak}-day streak` : "minority"} of athletes who actually finish what they start.`,
    ]);
    if (p >= 80) return pick([
      `${done}/${total} done. Good — but the last ${total-done} drill${total-done>1?"s are":" is"} where the margin lives. Finish next time.`,
      `${done} out of ${total}. Close. The final drills aren't optional — they're the difference.`,
    ]);
    if (p >= 50) return pick([
      `${done}/${total}. Half effort. ${gap}" doesn't care about your excuses.`,
      `You did ${done} drills. You needed ${total}. That's the gap between where you are and where you want to be.`,
    ]);
    return pick([
      `${done}/${total}. That's not training. Come back and finish it.`,
      `${done} drills. I need ${total} from you. Half sessions build nothing.`,
    ]);
  }

  if (mode?.type === "missed") {
    const { days } = mode;
    const wkLoss = +(days * 0.046).toFixed(2);
    if (days === 1) return pick([
      `Missed yesterday. You're still ${gap}" away. One day off is fine. Two is a habit.`,
      `Yesterday didn't happen. Today does. You're ${gap}" away — get started.`,
    ]);
    if (days === 2) return pick([
      `2 days off. That's ~${wkLoss}" of potential gain paused. Back today.`,
      `You've been off 2 days. ${gap > 10 ? `At ${gap}", you can't afford slow weeks.` : `You were this close. Don't let it slip.`}`,
    ]);
    return pick([
      `${days} days missed. Every day off is a day the ${gap}" gap doesn't close. Start now.`,
      `${days}-day break. You want to dunk or not? ${gap}" is still waiting. Train today.`,
    ]);
  }

  if (mode?.type === "new_pb") {
    const { newV, prev } = mode;
    const gained = +(newV - prev).toFixed(1);
    if (gap <= 0) return `${newV}". You can dunk. Keep training until it's automatic.`;
    if (gained >= 2) return pick([
      `+${gained}" — that's a real jump. You're now ${gap}" away. This is what consistent training looks like.`,
      `${newV}". Up ${gained}" from ${prev}". At this rate you'll be at the rim in ${wkEst} weeks.`,
    ]);
    if (gained > 0) return pick([
      `${newV}". Up ${gained}". Progress is real — ${gap}" to go. Keep the exact same routine.`,
      `+${gained}" since last measurement. Small gains compound. ${gap}" remaining.`,
    ]);
    return pick([
      `Same as last time. That means training harder, more consistently, or both.`,
      `No change. Plateau hit. Time to increase intensity or add load.`,
    ]);
  }

  if (mode?.type === "streak") {
    const { days } = mode;
    if (days === 7)  return `7 days straight. Most people quit in week 1. You didn't. Your vertical is responding — log it.`;
    if (days === 14) return `14 sessions. Two weeks of daily work. You are not the same athlete you were when you started.`;
    if (days === 30) return `30 days. One month of discipline. Log your vertical right now and compare to day one.`;
    return `${days}-day streak. You're building the kind of consistency that actually dunks.`;
  }

  if (mode?.type === "first_session") {
    return `First session done. That's the hardest one. Come back tomorrow — that's when it starts to matter.`;
  }

  if (mode?.type === "ten_sessions") {
    return `10 sessions. You're in the top third of athletes who start programs. Most quit by 5. Keep going.`;
  }

  // ── DAILY MESSAGE — varies by state, feels personalized ───────────────────
  // Uses Sunday weekly summary trigger
  if (new Date().getDay() === 0 && sessions > 0 && wkSess > 0) return pick([
    `Weekly check-in: ${wkSess} session${wkSess!==1?"s":""} this week. ${weeklyGain&&weeklyGain>0?`+${weeklyGain}" vertical gained.`:""} ${gap}" remaining. ${wkSess>=4?"Solid week.":"Push harder next week."}`,
    `End of week ${wkSess > 0 ? `— ${wkSess} sessions logged.` : "— nothing logged."} ${weeklyGain&&weeklyGain>0?`Vert up ${weeklyGain}". `:""}${gap}" to dunk. ${wkSess>=4?"You're on pace.":"You need 4+ sessions per week."}`,
  ]);

  // Zero sessions
  if (sessions === 0) return pick([
    `You're ${gap}" from dunking. None of that changes until you train. Start today.`,
    `${gap}" gap. Zero sessions. Those two facts are connected. Fix the second one.`,
    `Nothing changes until training starts. ${gap}" away. Open the Train tab.`,
    `First session is the hardest. Every athlete starts at zero. Start today.`,
  ]);

  // Critical absence
  if (lastDaysAgo !== null && lastDaysAgo >= 5) return pick([
    `${lastDaysAgo} days without training. You're ${gap}" away — same as when you stopped.`,
    `${lastDaysAgo}-day break. The ${gap}" gap waits for no one. Back today.`,
    `${lastDaysAgo} days missed. That's real progress lost. Restart now — don't make it a week.`,
  ]);

  // Missed 3–4 days
  if (lastDaysAgo !== null && (lastDaysAgo === 3 || lastDaysAgo === 4)) {
    return wkSess < 3
      ? pick([
          `${lastDaysAgo} days off. ${wkSess} session${wkSess===1?"":"s"} this week. You need 4+ — today counts.`,
          `Missing ${lastDaysAgo} days isn't failure. Restart today. ${gap}" is still waiting.`,
        ])
      : `${lastDaysAgo} days since your last session. Get back in today.`;
  }

  // Strong positive momentum
  if (weeklyGain && weeklyGain >= 1.5) return pick([
    `+${weeklyGain}" this week. You're ahead of average. ${gap <= 8 ? "The rim is close." : "Lock in this routine."} Don't change anything.`,
    `${weeklyGain}" of vertical gained this week. ${gap}" left. Keep the exact same schedule.`,
    `+${weeklyGain}" in 7 days — that's real. You're ${gap}" from the rim. Stay consistent.`,
  ]);

  if (monthlyGain && monthlyGain >= 2.5) return pick([
    `+${monthlyGain}" this month. ${gap <= 10 ? `${gap}" away — end is visible.` : "Real momentum building."} Keep 4+ sessions/week.`,
    `${monthlyGain}" gained in 30 days. That's what training looks like. ${gap}" remaining.`,
  ]);

  // Plateau
  if (trend === "plateau" && sessions >= 6) return pick([
    `Vertical hasn't moved. Your body adapted. Increase intensity — more sets, more weight, or go Pro.`,
    `Plateau. Same effort = same result. Change the stimulus or change nothing.`,
    `You've been stuck. That's a signal, not a verdict. Add load or increase frequency this week.`,
  ]);

  // Declining
  if (trend === "declining") return pick([
    `Recent numbers dropped. Inconsistency or poor recovery. Train more, sleep more, log honestly.`,
    `Vertical trending down slightly. Fatigue or gaps in training. Fix consistency first.`,
  ]);

  // Improving
  if (trend === "improving" && gap > 0) return pick([
    `You're improving. ${lastV}" now, ${gap}" to go. ~${wkEst} weeks at this pace. Don't break routine.`,
    `Numbers are moving in the right direction. ${lastV}" vert, ${gap}" from the rim. Stay on it.`,
    `Trend is up. ${gap}" left. The work is paying off — keep the same schedule.`,
  ]);

  // High streaks
  if (streak >= 20) return pick([
    `${streak} days straight. This is what separates players who dunk from those who talk about it.`,
    `${streak}-day streak. That's a habit now. Habits build dunkers.`,
    `${streak} consecutive days. Your body is adapting in ways you can't see yet. Trust it.`,
  ]);
  if (streak >= 10) return pick([
    `${streak} days. ${wkSess} sessions this week. ${wkSess >= 4 ? "Strong week." : "Push for 4+ days."}`,
    `${streak}-day streak, ${gap}" to go. The math is working in your favor.`,
    `10+ day streak. Most athletes quit before now. You're in the top tier for consistency.`,
  ]);
  if (streak >= 7) return pick([
    `Full week done. Legs are adapting. Results usually show at weeks 3–4. Stay in it.`,
    `7+ day streak. You've passed the point where most people quit. Keep the momentum.`,
    `Week 1 complete. Research says habit formation starts here. Don't stop now.`,
  ]);
  if (streak >= 3) return pick([
    `${streak} days in. Most people quit here. Don't.`,
    `${streak}-day streak. Momentum is building — protect it.`,
    `3+ days straight. The habit is forming. Show up tomorrow too.`,
  ]);

  // Low sessions this week
  if (wkSess === 0) return pick([
    `No sessions yet this week. ${new Date().toLocaleDateString("en-US",{weekday:"long"})} isn't over. Train today.`,
    `Zero this week. ${gap}" doesn't close on rest days.`,
    `The week's not over. Get one session in today.`,
  ]);
  if (wkSess === 1) return pick([
    `1 session this week. Need at least 4 to stay on a ${wkEst}-week timeline.`,
    `Once this week. You need 4 minimum. ${gap}" away — train today.`,
    `1 out of 4 sessions done. The week isn't lost yet. Train today.`,
  ]);
  if (wkSess === 2) return pick([
    `2 sessions this week. You need 2 more minimum. One today, one tomorrow.`,
    `Halfway there for the week. ${gap}" gap, ${wkEst} weeks estimated. Don't stop now.`,
  ]);

  // Session count milestones
  if (sessions < 5) return pick([
    `${sessions} session${sessions===1?"":"s"} in. First 10 build your foundation. Don't skip any.`,
    `${sessions}/10 foundation sessions. This phase matters more than you think.`,
    `You're getting started. ${gap}" away. ${sessions} sessions logged. Keep stacking.`,
  ]);
  if (sessions < 10) return pick([
    `${sessions} sessions logged. ${wkSess} this week. Real results start around session 10–15. Keep going.`,
    `Grind phase. Gains are building under the surface. Log your vert.`,
  ]);

  // Close to dunking
  if (gap <= 2)  return pick([`${gap}" away. This is where most people stall. Don't.`, `${gap}". Feel the rim. Every rep counts now.`, `${gap}" left. You're close enough that a single great week could close it.`]);
  if (gap <= 5)  return pick([`${gap}" from dunking. You can see it. Train like it.`, `${gap}". Close enough that every session matters more than the last.`, `${gap}" gap. This is where the work really starts to show.`]);
  if (gap <= 10) return pick([
    `${gap}" to go. ${wkSess >= 4 ? "Good week — finish it." : "Need more sessions this week."}`,
    `${gap}" away. ${lastV ? `Vertical at ${lastV}".` : "Log your vert."} ${wkSess} sessions this week.`,
    `${gap}" from the rim. You're in striking distance. ${wkSess >= 3 ? "Keep the frequency." : "Train more this week."}`,
  ]);

  // Default — always real numbers
  return pick([
    `You're ${gap}" away. ${lastV ? `Vertical: ${lastV}".` : "Log your vertical."} ${wkSess} session${wkSess!==1?"s":""} this week. ${wkSess >= 4 ? "On track." : "Need more days."}`,
    `${gap}" gap. ${sessions} total sessions. ${wkSess} this week. ${avgPerWeek >= 4 ? "Pace is solid." : "Increase your weekly sessions."}`,
    `${sessions} sessions total, ${wkSess} this week. ${gap}" to go. ${wkSess >= 4 ? "Stay consistent." : "Train 4x/week minimum."}`,
  ]);
}

// ─── SMART Q&A ────────────────────────────────────────────────────────────────
function coachAnswer(s, key) {
  const { gap, streak, sessions, lastV, bestV, weeklyGain, monthlyGain,
          wkSess, lastDaysAgo, trend, wkEst, avgPerWeek } = s;

  switch (key) {
    case "not_jumping":
      if (sessions === 0) return `You haven't trained at all. That's why. Log your first session today.`;
      if (wkSess < 3) return `You're only training ${wkSess}x this week. Vertical gains need 4+ sessions minimum. No shortcut.`;
      if (avgPerWeek < 3) return `You've averaged ${avgPerWeek} sessions/week. That's not enough for consistent gains. 4+ per week is the floor.`;
      if (trend === "plateau") return `You've plateaued. Your body adapted to the current load. Increase intensity: more sets, heavier weight, or switch to the Pro program.`;
      if (trend === "improving") return pick([`Your vertical IS improving. ${lastV}" current. Keep exactly what you're doing.`, `It is improving — you just might not notice it yet. Log your vert consistently to see the trend.`]);
      return `Two things kill progress: wrong training (squats alone don't do it — you need reactive plyos, depth drops, approach jumps) and inconsistency. Which one is yours?`;

    case "focus_today":
      if (lastDaysAgo !== null && lastDaysAgo >= 3) return `Today's focus is just showing up. You've been off ${lastDaysAgo} days. Full session. No skipping. Momentum > perfection.`;
      if (gap <= 5) return `Every approach jump today — go for the rim on every attempt. You're ${gap}" away. Mental reps count now.`;
      if (wkSess < 2) return `Full session, all drills. You're behind for the week — don't cut it short.`;
      if (weeklyGain && weeklyGain > 0) return `You're gaining. Do exactly what you've been doing. Full session, every drill.`;
      return pick([
        `Full session. All drills. ${gap}" doesn't close by coasting.`,
        `Today: complete every drill. ${gap}" away. Treat each rep like it matters — because it does.`,
      ]);

    case "how_long":
      if (gap <= 0) return `You can already dunk. Every session now builds consistency.`;
      if (weeklyGain && weeklyGain > 0) {
        const actualWks = Math.ceil(gap / (weeklyGain * 4));
        return `At your actual rate (+${weeklyGain}"/wk), ~${actualWks} weeks. Train ${wkSess < 4 ? "4x/week minimum" : "at this exact pace"} and that holds.`;
      }
      if (wkSess < 3) return `At ${wkSess} sessions/week? Longer than you want. At 4–5 sessions: ~${wkEst} weeks. Your timeline is in your control.`;
      return pick([
        `You're ${gap}" away. Average pace: ~${wkEst} weeks at 4–5 sessions/week. Log your vert regularly — that's how we track if you're ahead or behind.`,
        `${wkEst} weeks at current training frequency. ${avgPerWeek >= 4 ? "You're on pace." : "Increase to 4+ sessions/week to hit that."}`,
      ]);

    case "legs_sore":
      if (lastDaysAgo !== null && lastDaysAgo >= 2) return `You've been off ${lastDaysAgo} days already. Soreness is normal — do the warmup and approach jumps only. Movement speeds recovery.`;
      return pick([
        `Soreness = you trained. Don't skip. Cut volume: warmup + 10 approach jumps. Active recovery beats sitting.`,
        `Light session. Warmup only + approach jumps. Your legs will loosen up. Skipping entirely slows recovery.`,
      ]);

    case "missed_days":
      if (lastDaysAgo !== null && lastDaysAgo >= 5) return `${lastDaysAgo} days gone. Don't double up — just resume normal session today. Catching up with extra volume causes injury.`;
      if (lastDaysAgo !== null && lastDaysAgo >= 3) return `${lastDaysAgo} days missed. Don't compensate. One normal session today. You've done ${sessions} total — one reset doesn't erase that.`;
      return pick([
        `Missing days happens. Don't double up. Resume normal plan today. Consistency forward is all that matters.`,
        `Back to normal today. One session. Same intensity. Don't punish yourself with extra — just train.`,
      ]);

    case "vert_improving":
      if (!lastV) return `You haven't logged your vertical. I can't answer this without data. Go to Track → Vertical → LOG. Do it today.`;
      if (trend === "improving") return pick([
        `Yes. ${lastV}" current. ${weeklyGain ? `+${weeklyGain}" this week.` : ""} You're improving. Keep identical routine.`,
        `The data says yes. ${monthlyGain ? `+${monthlyGain}" this month.` : `${lastV}" latest.`} You're trending up.`,
      ]);
      if (trend === "plateau") return `Not recently. Your vertical has been flat at ~${lastV}". Plateau. Increase training intensity or you'll stay here.`;
      if (trend === "declining") return `Honestly, no — your numbers dropped slightly. Usually inconsistent training or poor recovery. Log more honestly and train 4x+/week.`;
      return `${sessions < 4 ? `Only ${sessions} session${sessions!==1?"s":""} logged. Train more to see a real trend.` : `Mixed signals — log more consistently.`} Current: ${lastV}".`;

    default:
      return `You're ${gap}" away. ${wkSess} sessions this week. ${wkSess >= 4 ? "Keep going." : "Train more."}`;
  }
}

const COACH_Qs = [
  {key:"not_jumping",   q:"Why am I not jumping higher?"},
  {key:"focus_today",   q:"What should I focus on today?"},
  {key:"how_long",      q:"How long until I can dunk?"},
  {key:"legs_sore",     q:"My legs are sore"},
  {key:"missed_days",   q:"I missed training days"},
  {key:"vert_improving",q:"Is my vertical improving?"},
];

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
function XPBar({xp}) {
  const r = getRank(xp), p = xpProg(xp);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:14}}>{r.icon}</span>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:r.color,letterSpacing:".06em"}}>{r.name}</span>
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.gold}}>{xp.toLocaleString()} XP</span>
      </div>
      <div style={{height:6,background:C.dim,borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${p.pct}%`,background:`linear-gradient(90deg,${r.color},${r.color}BB)`,borderRadius:3,transition:"width .6s cubic-bezier(.16,1,.3,1)"}}/>
      </div>
      {p.needed>0&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginTop:3}}>{p.needed} XP to {p.next}</div>}
    </div>
  );
}

function Tag({children,color}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:3,fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".1em",padding:"2px 8px",borderRadius:20,background:`${color}18`,border:`1px solid ${color}44`,color}}>{children}</span>;
}

function VertChart({logs, accentColor}) {
  if (logs.length < 2) return null;
  const vs = logs.map(l=>l.v);
  const W=280,H=56,mn=Math.min(...vs)-.5,mx=Math.max(...vs)+.5,rng=mx-mn;
  const best = Math.max(...vs);
  const pts = vs.map((v,i) => ({x:(i/(vs.length-1))*W, y:H-((v-mn)/rng)*(H-10)-5}));
  const path = pts.map((p,i)=>`${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `M0,${H} ${pts.map(p=>`L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")} L${W},${H} Z`;
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  return (
    <svg width={W} height={H} style={{overflow:"visible",display:"block",marginTop:4}}>
      <defs><linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity=".22"/>
        <stop offset="100%" stopColor={accent} stopOpacity="0"/>
      </linearGradient></defs>
      <path d={area} fill="url(#cg)"/>
      <path d={path} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i) => vs[i]===best
        ? <g key={i}><circle cx={p.x} cy={p.y} r="5" fill={C.gold} stroke={C.card} strokeWidth="2"/><text x={p.x} y={p.y-9} textAnchor="middle" fill={C.gold} fontSize="8" fontFamily="'DM Mono',monospace">PB</text></g>
        : i===pts.length-1 ? <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={accent} stroke={C.card} strokeWidth="1.5"/>
        : null)}
    </svg>
  );
}

// ─── MILESTONE POPUP ─────────────────────────────────────────────────────────
function Milestone({msg,sub,onClose, accentColor}) {
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div className="bounceIn" style={{background:"linear-gradient(135deg,#0D0D16,#150A06)",border:`2px solid ${accent}`,borderRadius:12,padding:"30px 26px",textAlign:"center",maxWidth:300,width:"100%",wordWrap:"break-word",overflowWrap:"break-word"}}>
        <div style={{fontSize:52,marginBottom:10}}>🎉</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:accent,letterSpacing:".05em",lineHeight:1.1,marginBottom:8,wordBreak:"break-word"}}>{msg}</div>
        {sub&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,marginBottom:18,lineHeight:1.6,wordBreak:"break-word"}}>{sub}</div>}
        <button onClick={onClose} style={{background:accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:".1em",padding:"11px 26px",borderRadius:5,minHeight:44}}>LET'S GO</button>
      </div>
    </div>
  );
}

// ─── PRO MODAL ────────────────────────────────────────────────────────────────
function ProModal({onClose,onUpgrade,gap,wkSess, accentColor}) {
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div className="slideup" style={{background:"#0D0D16",border:`1px solid ${accent}`,borderRadius:"14px 14px 0 0",width:"100%",maxWidth:520,padding:"24px 18px 38px",maxHeight:"92vh",overflowY:"auto",position:"relative",wordWrap:"break-word",overflowWrap:"break-word"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:16,background:"none",border:"none",color:"#B8B8D0",fontSize:22,lineHeight:1,minWidth:44,minHeight:44}}>✕</button>

        {/* Hook line */}
        <div style={{background:`${accent}12`,border:`1px solid ${accent}33`,borderRadius:7,padding:"10px 13px",marginBottom:14}}>
          <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:15,color:"#F0F0F0",lineHeight:1.4,wordBreak:"break-word"}}>You're already training. The difference is doing it right.</div>
        </div>

        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:accent,letterSpacing:".16em",marginBottom:5}}>THE DIFFERENCE</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:".03em",lineHeight:1.1,marginBottom:5,wordBreak:"break-word"}}>MOST PLAYERS NEVER DUNK<br/>BECAUSE THEY TRAIN RANDOMLY.</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:accent,letterSpacing:".04em",marginBottom:14,wordBreak:"break-word"}}>THIS FIXES THAT.</div>

        {/* Without vs With */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          {[
            {title:"TRAINING RANDOMLY",col:C.red,items:["No structure or plan","Progress stalls fast","Plateau at same vert","No idea what to do next"]},
            {title:"DUNK LAB PRO",col:accent,items:["6-week structured phases","Measurable weekly gains","Clear path to the rim","AI coach adjusts daily"]},
          ].map((side,si)=>(
            <div key={si} style={{background:si===0?"#0A0A12":"#0A120A",border:`1px solid ${side.col}30`,borderRadius:7,padding:"11px 12px",wordBreak:"break-word"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:side.col,letterSpacing:".1em",marginBottom:7,wordBreak:"break-word"}}>{side.title}</div>
              {side.items.map(t=>(
                <div key={t} style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:5}}>
                  <span style={{color:si===0?C.red:C.green,fontSize:11,flexShrink:0}}>{si===0?"✕":"✓"}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:si===0?C.muted:"#C8C8C8",lineHeight:1.4,wordBreak:"break-word"}}>{t}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Transformation line */}
        <div style={{background:`${accent}10`,border:`1px solid ${accent}33`,borderRadius:7,padding:"12px 13px",marginBottom:14}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:accent,letterSpacing:".12em",marginBottom:4}}>YOUR TRANSFORMATION</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:".03em",lineHeight:1.3,color:"#F0F0F0"}}>
            Stay stuck{gap>0?` at ${gap}" away`:""} → or be grabbing rim in 6–8 weeks
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginTop:3}}>Avg 2–4" gained in 6 weeks with structured training vs ~0.5" random</div>
        </div>

        {/* AI Coach hero feature */}
        <div style={{background:`${C.cyan}0C`,border:`1px solid ${C.cyan}33`,borderRadius:7,padding:"12px 13px",marginBottom:14}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.cyan,letterSpacing:".12em",marginBottom:5}}>MAIN FEATURE</div>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:22,flexShrink:0}}>🤖</span>
            <div>
              <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:15,letterSpacing:".04em",marginBottom:3}}>Personal AI Dunk Coach</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.55}}>Real-time feedback based on your progress, workouts, and stats. Tells you exactly what to fix and what to do next. Unlimited questions.</div>
            </div>
          </div>
        </div>

        {/* Phase timeline */}
        <div style={{display:"flex",gap:0,marginBottom:14}}>
          {[{w:"WK 1–2",p:"Foundation",c:accent},{w:"WK 3–4",p:"Overload",c:C.cyan},{w:"WK 5–6",p:"Peak",c:"#FF0040"}].map((ph,i)=>(
            <div key={ph.w} style={{display:"flex",alignItems:"center",flex:1}}>
              <div style={{flex:1,background:`${ph.c}14`,border:`1px solid ${ph.c}40`,borderRadius:5,padding:"8px 5px",textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:ph.c,letterSpacing:".06em"}}>{ph.w}</div>
                <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:12,marginTop:1}}>{ph.p}</div>
              </div>
              {i<2&&<div style={{width:4,height:2,background:C.muted,flexShrink:0}}/>}
            </div>
          ))}
        </div>

        {/* Features — results-focused */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:16}}>
          {[
            ["📅","6-Week Program","Progressive overload — not random workouts"],
            ["🤖","Unlimited AI Coach","Personalized daily feedback (Free = 3/day)"],
            ["⚡","Weekly Challenges","Extra XP + faster progress every week"],
            ["🔥","Streak Shield","One free save per week"],
            ["🏋️","Gym Training","Synced to maximize vertical gains"],
            ["📈","Weekly Breakdown","See exactly what's improving"],
          ].map(([ico,t,d])=>(
            <div key={t} style={{background:C.dim,borderRadius:6,padding:"9px 10px"}}>
              <div style={{fontSize:15,marginBottom:3}}>{ico}</div>
              <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:12,letterSpacing:".03em",marginBottom:1}}>{t}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,lineHeight:1.4}}>{d}</div>
            </div>
          ))}
        </div>

        {/* Urgency line */}
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,textAlign:"center",marginBottom:10}}>Every week you wait = slower progress.</div>

        {/* Social proof */}
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {[["Used by players training for their first dunk","#1E1E2A"],["Avg users gain 2–4\" in 6 weeks","#0A130D"]].map(([t,bg])=>(
            <div key={t} style={{flex:1,background:bg,border:`1px solid ${C.border}`,borderRadius:5,padding:"7px 9px",textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,lineHeight:1.5}}>{t}</div>
            </div>
          ))}
        </div>

        {/* MOST POPULAR badge + CTA */}
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:C.gold,color:"#000",fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:".12em",padding:"2px 12px",borderRadius:20,whiteSpace:"nowrap"}}>MOST POPULAR</div>
          <button onClick={onUpgrade} className="press" style={{width:"100%",background:accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:".1em",padding:"18px 0 16px",borderRadius:7,display:"block",marginBottom:7}}>
            START TRAINING SMARTER — $4.99/MO
          </button>
        </div>
        <div style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:9,color:"#2A2A2A"}}>Demo mode — real payments need Stripe</div>
      </div>
    </div>
  );
}

// ─── DUNK CALC ────────────────────────────────────────────────────────────────
function DunkCalc({onStart, accentColor}) {
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  const [h,setH]=useState(""); const [v,setV]=useState(""); const [sr,setSr]=useState(""); const [res,setRes]=useState(null);
  function calc() {
    const hi=parseFloat(h), vi=parseFloat(v), sri=sr?parseFloat(sr):null; if (!hi||!vi) return;
    const g=gapFn(hi,vi,sri), pct=dunkPctFn(hi,vi,sri), wk=weeksEst(g);
    const lvId=levelForVert(vi, hi, sri);
    const lv=LEVELS.find(l=>l.id===lvId)||LEVELS[0];
    setRes({g,pct,wk,lv,h:hi,v:vi,standingReach:sri});
  }
  return (
    <div className="fade">
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{fontSize:48,marginBottom:10}}>🏀</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:44,letterSpacing:".04em",lineHeight:1,marginBottom:6}}>DUNK LAB</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,lineHeight:1.8}}>Your personal dunk coach.<br/>Find out exactly where you stand.</div>
      </div>
      {!res ? (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:16}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:accent,letterSpacing:".16em",marginBottom:12}}>CAN YOU DUNK? — 10 SECONDS</div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>HEIGHT (inches)</div>
                <input type="number" placeholder="e.g. 66" value={h} onChange={e=>setH(e.target.value)} style={{fontSize:22,padding:"11px 12px",borderColor:h?accent:C.border}}/>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,marginTop:3}}>5'5"=65 · 5'10"=70 · 6'=72</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>VERTICAL (inches)</div>
                <input type="number" placeholder="e.g. 22" value={v} onChange={e=>setV(e.target.value)} style={{fontSize:22,padding:"11px 12px",borderColor:v?accent:C.border}}/>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,marginTop:3}}>Unsure? Start with 20"</div>
              </div>
            </div>
            <div style={{marginTop:10}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>STANDING REACH (inches)</div>
              <input type="number" placeholder="e.g. 88" value={sr} onChange={e=>setSr(e.target.value)} style={{fontSize:22,padding:"11px 12px",borderColor:sr?accent:C.border,width:"100%"}}/>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginTop:3}}>Optional but improves dunk gap accuracy.</div>
            </div>
          </div>
          <button onClick={calc} disabled={!h||!v} className={h&&v?"glowbtn":""} style={{width:"100%",background:h&&v?accent:"#111",color:h&&v?"#000":"#333",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:".1em",padding:"15px 0",borderRadius:7,opacity:h&&v?1:.5}}>FIND OUT →</button>
        </div>
      ) : (
        <div className="pop" style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{background:`linear-gradient(160deg,#0D0D16,${res.g===0?"#0A160D":"#150A06"})`,border:`1px solid ${res.g===0?C.green:accent}`,borderRadius:10,padding:"20px 16px",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:8}}>{res.g===0?"👑":res.lv.icon}</div>
            {res.g===0 ? (
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:C.green}}>YOU CAN DUNK!</div>
            ) : (
              <>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".14em",marginBottom:4}}>YOU ARE</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:56,color:accent,letterSpacing:".04em",lineHeight:1}}>{res.g}"</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#EEEEEE",letterSpacing:".06em",marginBottom:12}}>FROM DUNKING</div>
                <div style={{height:8,background:C.dim,borderRadius:4,marginBottom:5}}>
                  <div style={{height:8,width:`${res.pct}%`,background:`linear-gradient(90deg,${accent},#FF8000)`,borderRadius:4}}/>
                </div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>{res.pct}% there · ~{res.wk} weeks with consistent training</div>
              </>
            )}
          </div>
          {res.g>0&&(
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"13px 14px"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:8}}>YOUR PATH</div>
              {LEVELS.filter(l=>levelVert(l.id,res.h,res.standingReach)>res.v).slice(0,3).map((lv,i)=>{
                // Height-adjusted vertical needed — single source of truth
                const vertNeeded = levelVert(lv.id, res.h, res.standingReach);
                return (
                  <div key={lv.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:i<2?`1px solid ${C.dim}`:"none"}}>
                    <span style={{fontSize:16,minWidth:20}}>{lv.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:14,color:i===0?lv.color:"#F0F0F0"}}>{lv.label}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted}}>~{vertNeeded}" vertical for your height</div>
                    </div>
                    {i===0&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:lv.color}}>NEXT ↑</span>}
                  </div>
                );});
            </div>
          )}
          <button onClick={()=>onStart(res)} className="glowbtn" style={{width:"100%",background:accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:".1em",padding:"15px 0",borderRadius:7,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            START MY PROGRAM →
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#000000"}}>FREE · 30 SECONDS</span>
          </button>
          <button onClick={()=>setRes(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:13,padding:"10px 0",borderRadius:6,width:"100%"}}>← Recalculate</button>
        </div>
      )}
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({calcRes,onComplete, accentColor}) {
  const accent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange;
  const [step,setStep]=useState(0);
  const initialLevel = calcRes ? levelForVert(calcRes.v, calcRes.h, calcRes.standingReach) : 3;
  const [d,setD]=useState({name:"",age:"",height:calcRes?.h?.toString()||"",level:initialLevel,skill:"beginner",vertical:calcRes?.v?.toString()||"",standingReach:calcRes?.standingReach?.toString()||""});
  const ok0=d.name.trim()&&d.age&&d.height;
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <div style={{maxWidth:440,margin:"0 auto",padding:"24px 16px",width:"100%"}}>
        {step===0&&(
          <div className="fade" style={{display:"flex",flexDirection:"column",gap:14}}>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:4}}>STEP 1 OF 2</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:".04em",lineHeight:1,marginBottom:4}}>BUILD YOUR PLAN</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>Personalizes your workouts and dunk timeline.</div>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:14,display:"flex",flexDirection:"column",gap:10}}>
              <div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>YOUR NAME</div>
                <input type="text" placeholder="ENTER NAME" value={d.name} onChange={e=>setD(x=>({...x,name:e.target.value.toUpperCase()}))} style={{fontSize:20,padding:"11px 12px",borderColor:d.name?accent:C.border}}/>
              </div>
              <div style={{display:"flex",gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>AGE</div>
                  <input type="number" min="10" max="50" placeholder="—" value={d.age} onChange={e=>setD(x=>({...x,age:e.target.value}))} style={{fontSize:20,padding:"11px 12px",borderColor:d.age?accent:C.border}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>HEIGHT (inches)</div>
                  <input type="number" min="48" max="96" placeholder="66" value={d.height} onChange={e=>setD(x=>({...x,height:e.target.value}))} style={{fontSize:20,padding:"11px 12px",borderColor:d.height?accent:C.border}}/>
                </div>
              </div>
              <div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>CURRENT VERTICAL (inches)</div>
                <input type="number" min="10" max="50" placeholder="—" value={d.vertical} onChange={e=>setD(x=>({...x,vertical:e.target.value}))} style={{fontSize:20,padding:"11px 12px",borderColor:d.vertical?accent:C.border}}/>
                {calcRes?.v && <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,marginTop:3}}>Prefilled from previous page.</div>}
              </div>
              <div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:5}}>EXPERIENCE</div>
                <div style={{display:"flex",gap:6}}>
                  {["beginner","intermediate","advanced"].map(s=>(
                    <button key={s} onClick={()=>setD(x=>({...x,skill:s}))} style={{flex:1,background:d.skill===s?`${accent}20`:"#0C0C14",border:`1px solid ${d.skill===s?accent:C.border}`,color:d.skill===s?accent:"#B8B8D0",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".04em",padding:"9px 0",borderRadius:5,textTransform:"capitalize"}}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={()=>setStep(1)} disabled={!ok0} style={{width:"100%",background:ok0?accent:"#111",color:ok0?"#000":"#333",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:".1em",padding:"14px 0",borderRadius:7,opacity:ok0?1:.5}}>NEXT →</button>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,textAlign:"center"}}>30 seconds · no account needed</div>
          </div>
        )}
        {step===1&&(
          <div className="fade" style={{display:"flex",flexDirection:"column",gap:12}}>
            <button onClick={()=>setStep(0)} style={{background:"none",border:"none",color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:13,padding:0,textAlign:"left",marginBottom:2}}>← Back</button>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:4}}>STEP 2 OF 2</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:".04em",lineHeight:1.1,marginBottom:4}}>WHERE ARE YOU NOW?</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>Honest answer = better workouts.</div>
              {parseFloat(d.height) > 0 ? (
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:accent,marginTop:5}}>
                  Standing reach: {d.standingReach ? `${d.standingReach}" (measured)` : `~${Math.round(parseFloat(d.height)*1.335)}" (estimated)`} — verticals calculated for your height
                </div>
              ) : (
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginTop:5}}>
                  ← Go back and enter your height for personalized estimates
                </div>
              )}
            </div>
            {(() => {
              // Height-adjusted vertical estimates via the single source of truth.
              // Levels 1–2 stay descriptive (no numeric target).
              const h = parseInches(d.height, 48, 96);
              return (
                <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:340,overflowY:"auto"}}>
                  {LEVELS.map(lv=>{
                    // Compute height-specific vertical needed
                    let vertNeededStr;
                    if (h !== null && LEVEL_EXTRA[lv.id] !== null) {
                      vertNeededStr = `~${levelVert(lv.id, h, d.standingReach)}" vertical for your height`;
                    } else {
                      vertNeededStr = lv.id <= 2 ? "low vertical or standing reach" : `~${lv.vert}" vertical needed`;
                    }
                    return (
                      <button key={lv.id} onClick={()=>setD(x=>({...x,level:lv.id}))} style={{background:d.level===lv.id?`${lv.color}18`:C.card,border:`1px solid ${d.level===lv.id?lv.color:C.border}`,borderRadius:6,padding:"11px 13px",display:"flex",alignItems:"center",gap:12,transition:"all .15s",width:"100%"}}>
                        <span style={{fontSize:18,minWidth:24}}>{lv.icon}</span>
                        <div style={{flex:1,textAlign:"left"}}>
                          <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:14,color:d.level===lv.id?lv.color:"#F0F0F0"}}>{lv.label}</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>{vertNeededStr}</div>
                        </div>
                        {d.level===lv.id&&<span style={{color:lv.color,fontSize:14}}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              );
            })()}
            <button onClick={()=>onComplete(d)} className="glowbtn" style={{width:"100%",background:accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:19,letterSpacing:".1em",padding:"14px 0",borderRadius:7,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              BUILD MY PROGRAM
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,opacity:.7}}>YOUR FIRST WORKOUT IS READY</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PRO FEATURES DATA ────────────────────────────────────────────────────────

// Weekly challenges — rotate by ISO week number
function getWeekNumber() {
  const d = new Date(); d.setHours(0,0,0,0);
  d.setDate(d.getDate() + 4 - (d.getDay()||7));
  const y = new Date(d.getFullYear(),0,1);
  return Math.ceil((((d-y)/86400000)+1)/7);
}

const WEEKLY_CHALLENGE_POOLS = [
  [{id:"wc_workouts4",  label:"Complete 4 workouts this week",   icon:"💪", xp:80,  check:(d)=>(d.activeDays||[]).filter(a=>new Date(a)>=weekStart()).length>=4},
   {id:"wc_vert_log",   label:"Log your vertical 3 times",        icon:"📊", xp:60,  check:(d)=>(d.vertLogs||[]).filter(v=>new Date(v.date)>=weekStart()).length>=3},
   {id:"wc_sprints3",   label:"Log sprint times 3 days",           icon:"⚡", xp:50,  check:(d)=>(d.sprints||[]).filter(s=>new Date(s.date)>=weekStart()).length>=3}],
  [{id:"wc_streak5",    label:"Train 5 days in a row",             icon:"🔥", xp:100, check:(d)=>calcStreak(d.activeDays||[])>=5},
   {id:"wc_workouts5",  label:"Complete 5 workouts this week",   icon:"💪", xp:100, check:(d)=>(d.activeDays||[]).filter(a=>new Date(a)>=weekStart()).length>=5},
   {id:"wc_challenge7", label:"Complete daily challenge 7 days",  icon:"⚡", xp:75,  check:(d)=>(d.chDates||[]).filter(c=>new Date(c)>=weekStart()).length>=7}],
  [{id:"wc_noskim",     label:"Finish all drills 3 workouts",     icon:"✓",  xp:70,  check:(d)=>((d.fullWorkouts||[]).filter(w=>new Date(w)>=weekStart()).length>=3)},
   {id:"wc_vert_gain",  label:"Log a new vertical high",           icon:"📈", xp:90,  check:(d)=>{const vs=(d.vertLogs||[]);if(vs.length<2)return false;return vs[vs.length-1].v>vs.slice(0,-1).reduce((m,v)=>Math.max(m,v.v),0);}},
   {id:"wc_active6",    label:"Train 6 of 7 days this week",       icon:"🏆", xp:120, check:(d)=>(d.activeDays||[]).filter(a=>new Date(a)>=weekStart()).length>=6}],
];

function weekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day===0?-6:1);
  const start = new Date(now.getFullYear(), now.getMonth(), diff);
  start.setHours(0,0,0,0);
  return start;
}

function getWeeklyChallenges() {
  const pool = WEEKLY_CHALLENGE_POOLS[getWeekNumber() % WEEKLY_CHALLENGE_POOLS.length];
  return pool;
}

// Recovery day content
const RECOVERY_DAYS = [
  {title:"MOBILITY & STRETCH",  color:"#00D4FF", est:"20 min",
   note:"Active recovery — keeps tendons healthy and reduces injury risk.",
   drills:[
    {name:"Hip Flexor Stretch",    sets:2,reps:"60s/side",tip:"Hold deep — hip flexors limit jump height",
     how:"Kneel on one knee with other foot forward. Lean forward into the stretch, feeling it in the front of the hip of the kneeling leg. Hold for 60 seconds, then switch sides.",
     focus:"Deep stretch in hip flexor. Upright torso. Breathe through discomfort.",
     why:"Tight hip flexors limit jump height by restricting hip extension. Regular stretching improves range of motion and power output."},
    {name:"Calf & Achilles Stretch",sets:2,reps:"60s/side",tip:"Your tendons store elastic energy — keep them supple",
     how:"Place hands against wall. Step one foot back, keeping heel on ground. Lean forward to stretch calf and Achilles. Hold for 60 seconds, then switch legs.",
     focus:"Heel stays on ground. Straight back leg. Deep stretch in calf.",
     why:"Achilles tendon stores elastic energy for jumping. Keeping it supple prevents injury and maintains power output."},
    {name:"Pigeon Pose",           sets:2,reps:"90s/side",tip:"Opens hips — critical for full jump extension",
     how:"Start in a tabletop position. Bring one knee forward behind your wrist, extending the other leg back. Lower hips toward ground. Hold for 90 seconds, then switch sides.",
     focus:"Hips sinking toward ground. Square hips forward. Breathe deeply.",
     why:"Opens tight hips from jumping and squatting. Hip mobility is critical for full jump extension and injury prevention."},
    {name:"Foam Roll — Quads",     sets:1,reps:"2 min",  tip:"Slow, pause on tight spots",
     how:"Lie face down with foam roller under thighs. Roll slowly from hips to knees. Pause for 20-30 seconds on any tight spots. Avoid rolling directly on knees.",
     focus:"Slow rolling. Pause on tight spots. Breathe through tension.",
     why:"Releases quad tension from jumping and squatting. Improves muscle recovery and reduces injury risk."},
    {name:"Foam Roll — Calves",    sets:1,reps:"2 min",  tip:"Especially the Achilles insertion",
     how:"Sit with foam roller under one calf. Cross other leg over for pressure. Roll slowly from ankle to knee. Spend extra time on Achilles insertion. Switch legs.",
     focus:"Slow rolling. Focus on Achilles area. Don't roll over ankle bone.",
     why:"Calves and Achilles take massive load from jumping. Rolling releases tension and maintains tendon health."},
    {name:"Dead Bug — Core",       sets:3,reps:"10",     tip:"Braced core stabilizes every landing",
     how:"Lie on back with arms extended toward ceiling and legs in tabletop position. Slowly lower opposite arm and leg toward ground, keeping lower back pressed to floor. Return and switch sides.",
     focus:"Lower back stays flat. Controlled movement. Opposite arm and leg.",
     why:"Core stability is essential for landing mechanics. A braced core protects your spine and transfers force efficiently."},
   ]},
];

// Gym integration splits per Pro phase
const GYM_SPLITS = [
  {phase:"FOUNDATION (WK 1–2)", color:C.orange,
   push:{name:"PUSH — Chest/Shoulders/Triceps", drills:[
    {name:"DB Bench Press",      sets:3,reps:"10",  tip:"Controlled — build base strength",
     how:"Lie on bench holding dumbbells at chest level. Lower weights to chest with control. Press up explosively. Keep feet flat and back pressed to bench.",
     focus:"Controlled eccentric. Explosive press. Full range of motion.",
     why:"Builds chest and tricep strength — foundational for upper body power and arm swing in jumping."},
    {name:"DB Shoulder Press",   sets:3,reps:"10",  tip:"Overhead strength supports jump posture",
     how:"Sit or stand holding dumbbells at shoulder height. Press weights overhead until arms are fully extended. Lower with control. Keep core tight.",
     focus:"Full overhead extension. Controlled tempo. Stable core.",
     why:"Overhead pressing strength supports proper jump posture and arm mechanics for maximum height."},
    {name:"Lateral Raises",      sets:3,reps:"12",  tip:"Shoulder stability for landing control",
     how:"Hold dumbbells at sides. Raise arms out to sides until parallel with floor. Lower with control. Keep slight bend in elbows throughout.",
     focus:"Raise to shoulder height. Controlled tempo. Don't swing or use momentum.",
     why:"Shoulder stability improves landing control and reduces injury risk during jumps."},
    {name:"Tricep Pushdown",     sets:3,reps:"12",  tip:"Lockout strength — foundational",
     how:"Stand at cable machine holding bar with elbows tucked at sides. Push bar down until arms fully extended. Slowly return to start. Keep elbows stationary.",
     focus:"Full extension at bottom. Elbows stay pinned to sides. Controlled eccentric.",
     why:"Tricep strength powers arm swing — critical for generating momentum in jump takeoff."},
   ]},
   pull:{name:"PULL — Back/Biceps", drills:[
    {name:"DB Row",              sets:3,reps:"10",  tip:"Back strength = upright torso on landings",
     how:"Bend over with flat back, holding dumbbells. Pull weights to hips by driving elbows back. Squeeze shoulder blades at top. Lower with control.",
     focus:"Flat back throughout. Drive elbows back. Squeeze shoulder blades.",
     why:"Back strength maintains upright torso during landings — critical for jump mechanics and injury prevention."},
    {name:"Face Pull",           sets:3,reps:"15",  tip:"Shoulder health — don't skip this",
     how:"Set cable at face height with rope attachment. Pull rope toward face, spreading hands apart at end. Squeeze rear delts. Return slowly.",
     focus:"Pull to face level. Spread hands at end. Controlled eccentric.",
     why:"Shoulder health exercise — prevents imbalances from pressing and protects shoulders during jumping."},
    {name:"Bicep Curl",          sets:3,reps:"12",  tip:"Elbow health and upper arm balance",
     how:"Hold dumbbells at sides with palms facing forward. Curl weights to shoulders by bending elbows. Lower with control. Keep elbows pinned to sides.",
     focus:"Full range of motion. Elbows stay at sides. No swinging.",
     why:"Balances elbow joint health and upper arm strength — supports pulling mechanics and arm swing."},
   ]},
   legs:{name:"LEGS — Lower Body", drills:[
    {name:"Goblet Squat",        sets:4,reps:"10",  tip:"Foundation phase — full depth, controlled",
     how:"Hold a dumbbell at chest height with both hands. Squat down until thighs are parallel to floor. Keep chest up and elbows inside knees. Drive through heels to stand.",
     focus:"Full depth squat. Upright torso. Heels driving into ground.",
     why:"Builds leg strength and squat pattern. Essential foundation for explosive jumping power."},
    {name:"Romanian Deadlift",   sets:3,reps:"10",  tip:"Hamstring strength prevents injury",
     how:"Hold dumbbells in front of thighs with slight knee bend. Hinge at hips, lowering weights toward floor while keeping back flat. Feel hamstrings stretch, then drive hips forward to stand.",
     focus:"Hinge at hips, not waist. Flat back. Feel hamstrings working.",
     why:"Hamstring strength is critical for knee health and deceleration — prevents jumping injuries."},
    {name:"Calf Raises",         sets:4,reps:"20",  tip:"Your spring — do this every legs day",
     how:"Stand on edge of a step. Lower heels below step, then rise up onto toes as high as possible. Hold at top, then lower slowly. Can be done with or without weight.",
     focus:"Full range of motion. Slow controlled eccentric. Hold at peak contraction.",
     why:"Achilles tendon is your spring. Strong calves = more elastic energy for higher jumps."},
   ]}},
  {phase:"OVERLOAD (WK 3–4)", color:C.cyan,
   push:{name:"PUSH — Heavier", drills:[
    {name:"DB Bench Press",      sets:4,reps:"8",   tip:"Increase weight from Week 1–2",
     how:"Lie on bench holding dumbbells at chest level. Use heavier weight than Week 1-2. Lower weights to chest with control. Press up explosively.",
     focus:"Heavier load. Controlled eccentric. Explosive press.",
     why:"Progressive overload builds more chest and tricep strength for increased upper body power."},
    {name:"DB Shoulder Press",   sets:4,reps:"8",   tip:"Progressive overload — heavier now",
     how:"Sit or stand holding dumbbells at shoulder height. Use heavier weight than Week 1-2. Press weights overhead until arms fully extended. Lower with control.",
     focus:"Heavier overhead load. Full extension. Stable core.",
     why:"Stronger shoulders support better jump posture and more powerful arm swing mechanics."},
    {name:"Cable Fly",           sets:3,reps:"12",  tip:"Chest activation for push power",
     how:"Set cables at chest height. Stand in middle, holding handles with arms extended. Bring hands together in front of chest, squeezing pecs. Return slowly with control.",
     focus:"Full range of motion. Squeeze chest at end. Controlled eccentric.",
     why:"Chest isolation exercise improves push power and contributes to arm swing explosiveness."},
    {name:"Overhead Tricep Ext", sets:3,reps:"10",  tip:"Loaded stretch for strength gains",
     how:"Hold a dumbbell with both hands overhead. Lower weight behind head by bending elbows. Extend arms back overhead to start. Keep elbows pointing forward.",
     focus:"Loaded stretch position. Full extension. Control throughout.",
     why:"Loaded tricep stretch builds strength through full range — improves arm lockout power."},
   ]},
   pull:{name:"PULL — Heavier", drills:[
    {name:"Weighted DB Row",     sets:4,reps:"8",   tip:"Heavier than last week — track it",
     how:"Bend over with flat back, holding heavier dumbbells than Week 1-2. Pull weights to hips by driving elbows back. Squeeze shoulder blades at top. Lower with control.",
     focus:"Heavier load. Flat back throughout. Drive elbows back.",
     why:"Stronger back maintains better posture during landings and supports more powerful arm swing."},
    {name:"Lat Pulldown",        sets:3,reps:"10",  tip:"Lat strength supports explosive jumps",
     how:"Sit at lat pulldown machine. Grip bar wider than shoulders. Pull bar down to upper chest by driving elbows down. Squeeze lats at bottom. Return with control.",
     focus:"Pull to upper chest. Drive elbows down. Squeeze lats.",
     why:"Lat strength stabilizes shoulders and torso during jumping — improves force transfer and control."},
    {name:"Hammer Curl",         sets:3,reps:"10",  tip:"Brachialis — underrated for pulling power",
     how:"Hold dumbbells at sides with neutral grip (palms facing each other). Curl weights to shoulders by bending elbows. Lower with control. Keep elbows pinned to sides.",
     focus:"Neutral grip throughout. Elbows stay at sides. Full range.",
     why:"Targets brachialis muscle — builds forearm and elbow strength for better pulling mechanics."},
   ]},
   legs:{name:"LEGS — Peak Load", drills:[
    {name:"Front Squat",         sets:4,reps:"6",   tip:"Upright torso builds jump-specific strength",
     how:"Hold barbell across front shoulders. Squat down until thighs are parallel. Keep torso upright throughout. Drive through heels to stand.",
     focus:"Upright torso. Full depth. Heels driving into ground.",
     why:"Front squat builds jump-specific leg strength with upright posture — directly transfers to vertical jumping."},
    {name:"Nordic Curl",         sets:3,reps:"5",   tip:"Slow eccentric — hamstring armor",
     how:"Kneel with feet anchored. Lower your upper body slowly toward the ground using hamstrings to resist. Go as low as possible, then use hands to push back up.",
     focus:"Slow controlled descent. Resist gravity with hamstrings. Don't collapse.",
     why:"Builds eccentric hamstring strength — critical for injury prevention and deceleration control."},
    {name:"Single-Leg Press",    sets:3,reps:"8/s", tip:"Fixes imbalances that limit vertical",
     how:"Sit in leg press machine. Place one foot on platform. Lower weight until knee is bent, then press up to full extension. Switch legs after completing reps.",
     focus:"Full range of motion. Equal effort on both legs. Controlled tempo.",
     why:"Single-leg work fixes imbalances between legs — critical for balanced jumping and injury prevention."},
    {name:"Calf Raises — Heavy", sets:5,reps:"15",  tip:"Overload your spring",
     how:"Stand on edge of a step holding heavy dumbbells. Lower heels below step, then rise up onto toes as high as possible. Hold at top, then lower slowly.",
     focus:"Heavy load. Full range of motion. Slow controlled eccentric.",
     why:"Overloading calves builds more tendon stiffness — increases elastic energy for higher jumps."},
   ]}},
  {phase:"PEAK (WK 5–6)", color:"#FF0040",
   push:{name:"PUSH — Power Focus", drills:[
    {name:"Explosive DB Press",  sets:4,reps:"6",   tip:"Accelerate through the movement",
     how:"Lie on bench holding dumbbells at chest level. Press weights explosively, accelerating through entire movement. Lower with control. Focus on speed.",
     focus:"Explosive pressing speed. Accelerate through lockout. Controlled eccentric.",
     why:"Power-focused pressing builds explosive upper body strength for more powerful arm swing."},
    {name:"Med Ball Chest Pass", sets:4,reps:"8",   tip:"Power transfer — explosive upper body",
     how:"Stand holding medicine ball at chest. Push ball explosively forward as if passing. Have partner catch or throw against wall. Reset quickly between reps.",
     focus:"Maximum throwing speed. Explosive push. Quick reset.",
     why:"Medicine ball training develops explosive upper body power that transfers to jumping mechanics."},
    {name:"Band Pushdown",       sets:3,reps:"15",  tip:"Reactive — fast concentric",
     how:"Attach resistance band overhead. Hold bar with elbows tucked. Push down explosively, letting band snap back up. Focus on speed, not load.",
     focus:"Fast concentric speed. Reactive movement. Quick turnaround.",
     why:"Band training develops reactive power and fast twitch muscle fibers for explosive movements."},
   ]},
   pull:{name:"PULL — Power Focus", drills:[
    {name:"Explosive DB Row",    sets:4,reps:"6",   tip:"Row with intent — power, not grind",
     how:"Bend over with flat back, holding dumbbells. Row weights explosively to hips, driving elbows back with maximum speed. Lower with control.",
     focus:"Explosive rowing speed. Drive elbows back hard. Controlled eccentric.",
     why:"Power-focused rowing builds explosive back strength for more forceful arm swing mechanics."},
    {name:"Chin-Up",             sets:3,reps:"max", tip:"Bodyweight pulling power",
     how:"Hang from bar with underhand grip. Pull yourself up until chin clears bar. Lower with control. Go for maximum reps each set.",
     focus:"Full range of motion. Controlled tempo. Maximum effort.",
     why:"Bodyweight pulling power builds back and bicep strength — supports arm swing and upper body explosiveness."},
   ]},
   legs:{name:"LEGS — Explosive", drills:[
    {name:"Jump Squat",          sets:5,reps:"5",   tip:"Max intent on every rep — your vertical lives here",
     how:"Stand with feet shoulder-width apart. Squat down slightly, then jump as high as possible with maximum intent. Land softly and immediately reset. Go for max height every rep.",
     focus:"Maximum effort on every jump. Explosive upward movement. Soft landings.",
     why:"Jump squats directly train vertical jumping power — this is where your vertical gains happen."},
    {name:"Trap Bar Deadlift",   sets:5,reps:"4",   tip:"Most direct vertical carryover of any lift",
     how:"Stand inside trap bar with feet shoulder-width apart. Grip handles, hinge at hips, then explosively stand up driving through heels. Lower with control.",
     focus:"Explosive hip extension. Drive through heels. Full hip extension at top.",
     why:"Trap bar deadlift has the most direct carryover to vertical jumping of any lift — builds explosive hip power."},
    {name:"Depth Jump",          sets:4,reps:"5",   tip:"Pair with leg day for maximum overload",
     how:"Stand on a box 18-24 inches high. Step off (don't jump). Land on both feet and immediately jump as high as possible. Reset and repeat.",
     focus:"Absorb impact on landing. Immediate explosive jump. Minimize ground contact.",
     why:"Advanced plyometric that trains reactive strength — maximum overload for tendon elasticity."},
    {name:"Calf Raise — Max",    sets:5,reps:"12",  tip:"Last week — give everything",
     how:"Stand on edge of a step with maximum weight you can handle. Lower heels below step, then rise up onto toes as high as possible. Hold at top, then lower slowly.",
     focus:"Maximum weight. Full range of motion. Slow controlled eccentric.",
     why:"Peak phase calf training maximizes tendon stiffness — final push for maximum elastic energy."},
   ]}},
];

const RANK_REWARDS = {
  "PROSPECT":   "Complete your first workout to rank up.",
  "ROOKIE":     "✅ Unlocks: Daily challenge XP",
  "VARSITY":    "✅ Unlocks: Coach insight on your vertical progress",
  "STARTER":    "✅ Unlocks: Weekly performance report",
  "ALL-STAR":   "✅ Unlocks: Advanced coach training tips",
  "ELITE":      "✅ Unlocks: Detailed trend analysis from coach",
  "D1 LEVEL":  "✅ Unlocks: Pro trial discount (coming soon)",
  "HOOPER":     "✅ Unlocks: Legend badge + exclusive status",
  "LEGEND":     "👑 MAX RANK — You've put in the work.",
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [raw,setRaw]=useState(load);
  const [screen,setScreen]=useState(()=>load().name?"app":"calc");
  const [calcRes,setCalcRes]=useState(null);
  const [view,setView]=useState("home");
  const [tSub,setTSub]=useState("vert");
  // Theme system
  const [accentColor,setAccentColor]=useState(()=>localStorage.getItem("dl_theme")||"orange");
  
  // Save theme preference when changed
  useEffect(() => {
    localStorage.setItem("dl_theme", accentColor);
  }, [accentColor]);
  
  // Dynamic theme colors
  const theme = useMemo(() => ({
    ...C,
    accent: ACCENT_COLORS[accentColor] || ACCENT_COLORS.orange,
  }), [accentColor]);
  
  // Dynamic WORKOUTS array based on theme
  const WORKOUTS = useMemo(() => getWorkouts(accentColor), [accentColor]);
  
  // ── EXPLOIT FIX: drillsDone is persisted in localStorage keyed by date+workoutDay ──
  const [drillsDone,setDrillsDone]=useState(()=>{
    try {
      const todayKey = new Date().toISOString().slice(0,10);
      // Load today's regular drills
      const stored = JSON.parse(localStorage.getItem("dl_drills_v10") || "{}");
      const dated = stored[todayKey] || {};
      // Load permanent prog drills (pro/gym/rec)
      const prog = JSON.parse(localStorage.getItem("dl_prog_v10") || "{}");
      // Recovery drills are date-based — only keep today's
      const progFiltered = Object.fromEntries(
        Object.entries(prog).filter(([k]) => {
          if (k.startsWith("rec-")) return k.startsWith(`rec-${todayKey}`);
          return true; // pro- and gym- are permanent
        })
      );
      return {...dated, ...progFiltered};
    } catch { return {}; }
  });
  const [showPro,setShowPro]=useState(false);
  const [milestone,setMilestone]=useState(null);
  const [toast,setToast]=useState("");
  const [vertInput,setVertInput]=useState("");
  const [vertFeedback,setVertFeedback]=useState(null);
  const [sprintInput,setSprintInput]=useState({time:"",dist:"40"});
  const [proWeek,setProWeek]=useState(0);
  const [proTab,setProTab]=useState("program"); // program | gym | recovery | challenges
  const [gymSplit,setGymSplit]=useState("legs");
  const [gymPhase,setGymPhase]=useState(0);
  const [coachOpen,setCoachOpen]=useState(false);
  const [coachQ,setCoachQ]=useState(null);
  const [coachText,setCoachText]=useState("");
  const [coachTextReply,setCoachTextReply]=useState(null);
  const [coachTyping,setCoachTyping]=useState(false);
  const [postWorkoutMsg,setPostWorkoutMsg]=useState(null);
  const [whyOpen,setWhyOpen]=useState(false);
  const [skipDrill,setSkipDrill]=useState(null);

  // Persist drillsDone to localStorage whenever it changes
  // Regular drills (date-keyed) go in dl_drills_v10
  // Pro/gym/recovery drills (permanent keys) go in dl_prog_v10 so they never reset
  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0,10);
    // Split: date-based drills (wkey = today) vs permanent prog drills
    const dated = {}, prog = {};
    Object.entries(drillsDone).forEach(([k,v]) => {
      if (k.startsWith("pro-") || k.startsWith("gym-") || k.startsWith("rec-")) {
        prog[k] = v;
      } else {
        dated[k] = v;
      }
    });
    // Persist date drills (keyed by date, pruned after 2 days)
    const existing = (() => { try { return JSON.parse(localStorage.getItem("dl_drills_v10") || "{}"); } catch { return {}; } })();
    existing[todayKey] = dated;
    Object.keys(existing).forEach(k => { if (k < prevDay(todayKey)) delete existing[k]; });
    localStorage.setItem("dl_drills_v10", JSON.stringify(existing));
    // Persist prog drills permanently
    try { localStorage.setItem("dl_prog_v10", JSON.stringify(prog)); } catch {}
  }, [drillsDone]);

  const mut = useCallback(fn => {
    setRaw(prev => { const n = fn(prev); save(n); return n; });
  }, []);

  // Derived data
  const D = {
    name:raw.name||"ATHLETE", height:raw.height||"", standingReach:raw.standingReach, level:raw.level!=null?raw.level:3,
    skill:raw.skill||"beginner", xp:raw.xp||0,
    activeDays:raw.activeDays||[], vertLogs:raw.vertLogs||[],
    sprints:raw.sprints||[], isPro:raw.isPro||false, chDates:raw.chDates||[],
    vertical:raw.vertical, standingReach:raw.standingReach, age:raw.age,
    streak:calcStreak(raw.activeDays||[]),
    doneToday:(raw.activeDays||[]).includes(today()),
    sessions:(raw.activeDays||[]).length,
    // XP exploit protection: track which drills already gave XP today
    drillXpDates: raw.drillXpDates || {},
    // Coach question count per day (free limit)
    coachQDates: raw.coachQDates || {},
  };

  // Questions used today (free = 3 limit)
  const todayQCount = D.coachQDates[today()] || 0;
  const coachQLimit = D.isPro ? Infinity : 3;
  const coachQLeft  = Math.max(0, coachQLimit - todayQCount);

  // Full coach snapshot
  console.log("HOME PROFILE", D);
  const snap = snapshot({...raw, vertLogs:D.vertLogs, activeDays:D.activeDays});
  const { gap, effVert, wkSess, lastDaysAgo, weeklyGain, monthlyGain, trend } = snap;

  const rank    = getRank(D.xp);
  const curLv   = LEVELS.find(l=>l.id===D.level)||LEVELS[2];
  const nextLv  = LEVELS.find(l=>l.id===D.level+1);
  const lastVert= D.vertLogs.length ? D.vertLogs[D.vertLogs.length-1].v : null;
  const bestVert= D.vertLogs.length ? Math.max(...D.vertLogs.map(v=>v.v)) : null;
  // Sprint PB per distance
  const sprintPBs = D.sprints.reduce((acc,s)=>{
    if (!acc[s.dist] || s.time < acc[s.dist]) acc[s.dist]=s.time;
    return acc;
  },{});
  // Days trained this month
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);
  const daysThisMonth = D.activeDays.filter(d=>new Date(d)>=monthStart).length;
  const pct     = dunkPctFn(parseFloat(D.height)||DEFAULT_HEIGHT, effVert, D.standingReach);

  // ── STREAK SHIELD (Pro only) ─────────────────────────────────────────────
  const shieldAvailable = D.isPro && (raw.shieldUsedWeek !== getWeekNumber());
  const shieldUsed      = D.isPro && raw.shieldUsedWeek === getWeekNumber();

  // ── WEEKLY CHALLENGES (Pro only) ────────────────────────────────────────
  const weeklyChallenges = D.isPro ? getWeeklyChallenges() : [];
  const weekKey   = `wc_week_${getWeekNumber()}`;
  const claimedWC = raw[weekKey] || [];

  // ── WEEKLY REPORT ────────────────────────────────────────────────────────
  const weeklyReport = useMemo(() => {
    const wkAgo = new Date(); wkAgo.setDate(wkAgo.getDate()-7);
    const wkSess2 = D.activeDays.filter(d=>new Date(d)>wkAgo).length;
    const wkVerts = D.vertLogs.filter(l=>new Date(l.date)>wkAgo);
    const wkGain  = wkVerts.length>=2 ? +(wkVerts[wkVerts.length-1].v-wkVerts[0].v).toFixed(1) : null;
    const consistency = wkSess2>=5?"Elite":wkSess2>=4?"Strong":wkSess2>=3?"Decent":wkSess2>=2?"Low":"Inactive";
    const assessment  = wkSess2>=4&&wkGain&&wkGain>0
      ? `Solid week. ${wkSess2} sessions, +${wkGain}" gained. Stay on this pace.`
      : wkSess2>=3 ? `${wkSess2} sessions. ${wkGain&&wkGain>0?`+${wkGain}" this week.`:""} Add 1–2 more next week.`
      : wkSess2>0  ? `Only ${wkSess2} session${wkSess2!==1?"s":""} this week. Consistency is the only variable you control.`
      : "No sessions this week. That breaks progress. Restart today.";
    return {wkSessions:wkSess2, wkGain, consistency, assessment};
  }, [D.sessions, D.vertLogs.length, snap.gap]);
  const todayW  = (() => {
    const base = WORKOUTS[new Date().getDay()%4];
    // Skill affects drill count shown
    if (D.skill === "beginner") {
      // Beginners: remove last drill (usually the hardest advanced one)
      return {...base, drills: base.drills.slice(0, 4), est: "15 min"};
    }
    if (D.skill === "advanced") {
      // Advanced: keep all drills, add extra sets note
      return {...base, drills: base.drills.map(d => ({...d, sets: d.sets + 1}))};
    }
    return base; // intermediate: default
  })();
  const wkey    = today(); // full YYYY-MM-DD — prevents same weekday bleeding across weeks

  // ── XP EXPLOIT FIX: drills only count once per day ──────────────────────────
  // Key format: "YYYY-MM-DD:drillname"
  function drillXpKey(drillName) { return `${today()}:${drillName}`; }
  function drillAlreadyGaveXP(drillName) { return !!D.drillXpDates[drillXpKey(drillName)]; }

  const doneCnt = todayW.drills.filter(d=>drillsDone[`${wkey}-${d.name}`]).length;
  const allDone = doneCnt === todayW.drills.length;
  const todayCh = CHALLENGES[new Date().getDay()%CHALLENGES.length];
  const chDone  = D.chDates.includes(today());

  // Today's focus label per workout type
  const FOCUS_LABELS = {
    "JUMP TRAINING":  "EXPLOSIVE POWER",
    "STRENGTH DAY":   "STRENGTH BASE",
    "SPEED & AGILITY":"SPEED & FIRST STEP",
    "VERTICAL FOCUS": "MAX JUMP PERFORMANCE",
  };
  const todayFocus = FOCUS_LABELS[todayW.title] || "TODAY'S FOCUS";

  // Daily coach message — memoized so typing in input doesn't cause flicker
  const dailyCoachMsg = useMemo(() => coachMsg(snap), [
    snap.gap, snap.streak, snap.sessions, snap.wkSess,
    snap.lastDaysAgo, snap.weeklyGain, snap.trend, snap.effVert
  ]);

  // Missed day detection
  const returnMsg = lastDaysAgo !== null && lastDaysAgo >= 2 && !D.doneToday
    ? coachMsg(snap, {type:"missed", days:lastDaysAgo})
    : null;

  // Sunday weekly summary card (shown on Rank screen too)
  const isSunday = new Date().getDay() === 0;
  const weeklySummary = useMemo(() => {
    if (!isSunday || D.sessions === 0) return null;
    const wkAgo = new Date(); wkAgo.setDate(wkAgo.getDate()-7);
    const ws = D.activeDays.filter(d=>new Date(d)>wkAgo).length;
    const wv = D.vertLogs.filter(l=>new Date(l.date)>wkAgo);
    const wg = wv.length>=2 ? +(wv[wv.length-1].v-wv[0].v).toFixed(1) : null;
    return {ws, wg, gap: snap.gap, wkEst: snap.wkEst};
  }, [isSunday, D.sessions, D.vertLogs.length, snap.gap, snap.wkEst]);

  function showT(m) { setToast(m); setTimeout(()=>setToast(""),2600); }
  function triggerM(msg,sub) { setMilestone({msg,sub}); }

  // Mini achievement check — runs after marking done
  function checkMiniAchievements(days, newXp) {
    const s = calcStreak(days);
    const prevXp = D.xp; // capture before mutation
    if (s === 3)  setTimeout(()=>triggerM("3-DAY STREAK 🔥","Momentum is building. Don't stop now."),400);
    if (s === 7)  setTimeout(()=>triggerM("7-DAY STREAK ⚡","One full week. Most athletes never get here."),400);
    if (s === 14) setTimeout(()=>triggerM("14-DAY STREAK 💎","Two weeks straight. This is habit."),400);
    if (days.length === 1)  setTimeout(()=>triggerM("FIRST WORKOUT 🏀","Your journey starts here. Come back tomorrow."),400);
    if (days.length === 10) setTimeout(()=>triggerM("10 SESSIONS 💪","Top 30% of athletes. Most quit before this."),400);
    if (days.length === 25) setTimeout(()=>triggerM("25 SESSIONS 🔥","You're consistent. That's rarer than talent."),400);
    if (days.length === 50) setTimeout(()=>triggerM("50 SESSIONS 👑","Elite consistency. You've earned this."),400);
    // Rank-up: compare rank names before and after XP gain
    const prevRankName = getRank(prevXp).name;
    const newRankName  = getRank(newXp).name;
    if (prevRankName !== newRankName) {
      const r = getRank(newXp);
      setTimeout(()=>triggerM(`RANK UP: ${r.name} ${r.icon}`,`New rank unlocked. ${RANK_REWARDS[r.name]}`),600);
    }
  }

  // ── SMART FREE-TEXT COACH RESPONSE ───────────────────────────────────────
  function generateTextResponse(text) {
    const t = text.toLowerCase().trim();
    const s = snap;

    // Keyword routing — map typed question to closest answer key
    if (/(sore|tired|hurt|pain|ache|recovery|rest)/.test(t))
      return coachAnswer(s, "legs_sore");
    if (/(miss|skip|off day|took a break|haven't train|didn't train|no session)/.test(t))
      return coachAnswer(s, "missed_days");
    if (/(improv|getting better|progress|higher|gaining|gain)/.test(t))
      return coachAnswer(s, "vert_improving");
    if (/(how long|when|weeks|timeline|dunk by|reach rim|touch rim)/.test(t))
      return coachAnswer(s, "how_long");
    if (/(focus|today|what should|what do i|what to do|priority)/.test(t))
      return coachAnswer(s, "focus_today");
    if (/(not jump|same|stuck|plateau|not improving|no progress|why can't|why isn't|not working)/.test(t))
      return coachAnswer(s, "not_jumping");
    if (/(explosive|plyo|plyometric|fast twitch|jump train|power)/.test(t))
      return pick([
        `Plyometrics are your main lever. Box jumps, depth drops, and approach jumps train the fast-twitch fibers that move you off the ground. ${s.wkSess < 3 ? "You need more sessions per week to see results." : "Keep the frequency up."}`,
        `Explosive training = depth drops + reactive jumps + approach work. You're ${s.gap}" away. Each session of this directly chips at that gap.`,
      ]);
    if (/(strength|squat|hip|glute|leg day|weights|gym)/.test(t))
      return pick([
        `Stronger hips and legs = more force = more inches. Goblet squats, hip thrusts, and split squats are your foundation. They directly translate to the rim.`,
        `Strength base is what makes plyometrics actually work. ${s.wkSess < 3 ? "You need more training days this week." : "Your current frequency supports this — keep going."}`,
      ]);
    if (/(warm up|warmup|warm-up|stretch|flexibility|mobility)/.test(t))
      return pick([
        `Warmup is non-negotiable. Cold muscles don't generate explosive force — they get injured instead. 3–5 min minimum before every jump session.`,
        `Don't skip warmup. Leg swings, high knees, and jump rope prep your tendons and nervous system. Skipping it limits your ceiling on every session.`,
      ]);
    if (/(eat|food|diet|protein|nutrition|calories|carb)/.test(t))
      return pick([
        `Protein and sleep matter more than most training decisions. Muscles repair at night. Aim for 0.7–1g protein per lb of bodyweight and 8+ hours.`,
        `Training stimulus + nutrition + sleep = vertical gains. If your sleep or protein is off, your gains are off. Don't overlook the basics.`,
      ]);
    if (/(sleep|rest|recover|night|bed)/.test(t))
      return pick([
        `Sleep is when vertical gains actually happen. Less than 7 hours? Your fast-twitch fibers aren't recovering fully between sessions.`,
        `Recovery is training. You don't grow in the gym — you grow while sleeping. 8 hours + a rest day each week is the formula.`,
      ]);

    // ── Fallback pool — varied, never the same twice in a row, always reference data ──
    const fallbacks = [
      `Ask me about workouts, recovery, vertical progress, or dunk goals. I work best with specific questions.`,
      `I can help with training, soreness, explosiveness, and dunk progression. What specifically are you trying to fix?`,
      `Not sure what you're asking. Try: "why am I not jumping higher" or "what should I focus on today".`,
      `${s.lastV ? `You're at ${s.lastV}", ${s.gap}" from the rim.` : `Log your vertical first — I need the data.`} Ask me something specific about training, recovery, or progress.`,
      `I respond best to specific questions — soreness, plateaus, what to focus on, or how long until you dunk. What's the issue?`,
      `${s.wkSess < 3 ? `You've only trained ${s.wkSess}x this week.` : `${s.wkSess} sessions this week — decent.`} What do you want to work on? Ask me about training, recovery, or your vertical.`,
      `Try asking: "How long until I can dunk?" or "My legs are sore" or "Is my vertical improving?" — I'll give you a real answer.`,
    ];
    return pick(fallbacks);
  }

  function submitCoachText() {
    if (!coachText.trim()) return;
    if (coachQLeft <= 0 && !D.isPro) {
      setCoachQ(-1);
      return;
    }
    const q = coachText;
    mut(prev => {
      const dates = {...(prev.coachQDates||{})};
      dates[today()] = (dates[today()]||0) + 1;
      return {...prev, coachQDates:dates};
    });
    setCoachText("");
    setCoachTextReply(null);
    setCoachTyping(true);
    setTimeout(() => {
      setCoachTextReply(generateTextResponse(q));
      setCoachTyping(false);
    }, 900 + Math.random() * 400);
  }

  function useCoachQ(key) {
    if (coachQLeft <= 0 && !D.isPro) {
      setCoachQ(-1);
      return;
    }
    mut(prev => {
      const dates = {...(prev.coachQDates||{})};
      dates[today()] = (dates[today()]||0) + 1;
      return {...prev, coachQDates:dates};
    });
    setCoachTyping(true);
    setCoachTextReply(null);
    const idx = COACH_Qs.findIndex(q => q.key === key);
    setTimeout(() => {
      setCoachQ(idx);
      setCoachTyping(false);
    }, 850 + Math.random() * 350);
  }

  function markDone() {
    if (D.doneToday) { showT("Already done today. Come back tomorrow."); return; }
    const days = [...D.activeDays, today()];
    const s = calcStreak(days);
    const bonus = s===7?100:s===14?150:s===30?400:0;
    const newXp = (D.xp||0)+60+bonus;
    // Track full workouts for the wc_noskim weekly challenge
    const fullWorkouts = [...(raw.fullWorkouts||[])];
    if (doneCnt === todayW.drills.length && !fullWorkouts.includes(today())) {
        fullWorkouts.push(today());
    }
      mut(prev => ({...prev, activeDays:days, xp:newXp, fullWorkouts}));
    spawnXP(60+bonus);
    const pwMsg = coachMsg(snap, {type:"post_workout", done:doneCnt, total:todayW.drills.length});
    setPostWorkoutMsg(pwMsg);
    checkMiniAchievements(days, newXp);
  }

  function logVert() {
    if (!vertInput) return;
    const v = parseFloat(vertInput);
    if (isNaN(v) || v < 5 || v > 60) { showT("Enter a valid vertical (5–60 inches)"); return; }
    const prev = D.vertLogs.length ? D.vertLogs[D.vertLogs.length-1].v : null;

    // XP exploit fix: only +25 XP once per calendar day for vertical logging
    const alreadyLoggedVertToday = D.vertLogs.some(l => l.date === today());
    const xpGain = alreadyLoggedVertToday ? 0 : 25;

    const logs = [...D.vertLogs, {v, date:today()}];

    // AUTO-UPDATE LEVEL: highest milestone the user's vertical clears (reach-aware)
    const autoLevelId = levelForVert(v, D.height, D.standingReach);
    const newLevel = Math.max(autoLevelId, D.level);
    const leveledUp = newLevel > D.level;

    mut(prev2 => ({...prev2, vertLogs:logs, xp:(prev2.xp||0)+xpGain, level:newLevel}));
    if (xpGain > 0) spawnXP(25);
    else showT("Logged — no extra XP (already earned today)");
    setVertInput("");

    if (leveledUp) {
      const newLv = LEVELS.find(l => l.id === newLevel);
      setTimeout(() => triggerM(`LEVEL UP ${newLv.icon}`, `You reached: ${newLv.label}. Workouts updated.`), 500);
    }

    // Dynamic feedback — use threshold not strict equality for floats
    if (prev !== null) {
      const diff = +(v - prev).toFixed(1);
      if (diff > 1.5)              setVertFeedback({positive:true,  msg:`+${diff}" — major gain. That's the training working.`});
      else if (diff > 0.4)         setVertFeedback({positive:true,  msg:`+${diff}" improvement. Progress is real. Keep the routine.`});
      else if (diff > 0.05)        setVertFeedback({positive:true,  msg:`+${diff}". Small but real. Consistent gains compound over weeks.`});
      else if (Math.abs(diff)<0.1) setVertFeedback({positive:false, msg:`No change from last measurement. Increase intensity or check sleep and recovery.`});
      else                          setVertFeedback({positive:false, msg:`Down ${Math.abs(diff)}". Could be fatigue — log after rest. If it continues, adjust training.`});
      if (!leveledUp) {
        const pbMsg = coachMsg(snapshot({...raw,vertLogs:logs}), {type:"new_pb", newV:v, prev});
        setTimeout(() => triggerM(v>prev?`+${diff}" GAIN`:`LOGGED: ${v}"`, pbMsg), 400);
      }
    } else {
      // First ever log — only one notification
      setTimeout(() => triggerM("FIRST VERT LOGGED 📊", "Now I can track your progress. Log regularly."), 300);
    }
    // Reach-aware milestone popups — thresholds match the Your Path targets
    const rimT  = levelVert(4, D.height, D.standingReach); // Touches Rim
    const hangT = levelVert(6, D.height, D.standingReach); // Hangs on Rim
    const dunkT = levelVert(8, D.height, D.standingReach); // CAN DUNK
    if (v>=rimT &&!D.vertLogs.some(l=>l.v>=rimT))  setTimeout(()=>triggerM("TOUCHES RIM 🤙","You earned this. Keep going."),700);
    if (v>=hangT&&!D.vertLogs.some(l=>l.v>=hangT)) setTimeout(()=>triggerM("HANGS ON RIM 💥","Elite-level athleticism. Dunk is right there."),700);
    if (v>=dunkT&&!D.vertLogs.some(l=>l.v>=dunkT)) setTimeout(()=>triggerM("👑 YOU CAN DUNK","You did it. You are the proof it works."),700);
  }

  function logSprint() {
    if (!sprintInput.time) return;
    const t = parseFloat(sprintInput.time);
    if (isNaN(t) || t <= 0 || t > 300) { showT("Enter a valid sprint time (0–300 sec)"); return; }
    // XP exploit fix: only +20 XP once per distance per day
    const alreadyLoggedDistToday = (D.sprints||[]).some(
      s => s.date === today() && s.dist === sprintInput.dist
    );
    const xpGain = alreadyLoggedDistToday ? 0 : 20;
    mut(prev=>({
      ...prev,
      sprints:[...(prev.sprints||[]),{time:t,dist:sprintInput.dist,date:today()}],
      xp:(prev.xp||0)+xpGain,
    }));
    if (xpGain > 0) { spawnXP(20); showT(`⚡ Sprint logged +20 XP`); }
    else showT(`⚡ Sprint logged — no extra XP (${sprintInput.dist}yd already earned today)`);
    setSprintInput({time:"",dist:"40"});
  }

  function upgrade() {
    mut(prev=>({...prev,isPro:true,xp:(prev.xp||0)+75}));
    setShowPro(false); showT("👑 Pro unlocked +75 XP");
    triggerM("PRO UNLOCKED 🌟","The 6-week program is yours. Don't waste it.");
  }

  // ── SCREENS ────────────────────────────────────────────────────────────────
  if (screen==="calc") return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <div style={{maxWidth:440,margin:"0 auto",padding:"28px 16px",width:"100%"}}>
        <DunkCalc onStart={res=>{setCalcRes(res);setScreen("onboard");}} accentColor={accentColor}/>
      </div>
    </div>
  );

  if (screen==="onboard") return (
    <Onboarding calcRes={calcRes} onComplete={d=>{
      const vl = d.vertical ? [{v:parseFloat(d.vertical),date:today()}] : (calcRes ? [{v:calcRes.v,date:today()}] : []);
      const nd = {name:d.name,age:d.age,height:d.height,level:d.level,skill:d.skill,vertical:d.vertical,standingReach:d.standingReach,xp:0,activeDays:[],vertLogs:vl,sprints:[],chDates:[],isPro:false};
      console.log("FINAL PROFILE", nd);
      save(nd); setRaw(nd); setScreen("app");
    }} accentColor={accentColor}/>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  const HomeView = (
    <div className="fade">

      {/* FIRST SESSION WELCOME — only shown before any session */}
      {D.sessions === 0 && (
        <div className="pop" style={{background:`linear-gradient(135deg,${theme.accent}12,${C.gold}08)`,border:`1px solid ${theme.accent}44`,borderRadius:9,padding:"13px 15px",marginBottom:10}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:theme.accent,letterSpacing:".05em",marginBottom:3}}>WELCOME TO DUNK LAB 🏀</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:8}}>Your personalized dunk program is ready. Complete your first workout to start earning XP and tracking progress.</div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1,background:C.dim,borderRadius:5,padding:"7px 9px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:C.gold}}>1</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted}}>Complete a workout</div>
            </div>
            <div style={{flex:1,background:C.dim,borderRadius:5,padding:"7px 9px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:C.gold}}>2</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted}}>Log your vertical</div>
            </div>
            <div style={{flex:1,background:C.dim,borderRadius:5,padding:"7px 9px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:C.gold}}>3</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted}}>Track your dunk gap</div>
            </div>
          </div>
        </div>
      )}

      {/* LIVE COACH CARD — reacts to user state */}
      <div className={returnMsg?"coachpulse":""} style={{background:`${theme.accent}0D`,border:`1px solid ${returnMsg?theme.accent+"66":theme.accent+"30"}`,borderRadius:8,padding:"11px 14px",marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:theme.accent,letterSpacing:".14em",marginBottom:3}}>
              🤖 COACH {returnMsg?"· MISSED DAY ALERT":"· TODAY"}
            </div>
            <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:15,color:"#EEE",lineHeight:1.4}}>
              {returnMsg || dailyCoachMsg}
            </div>
          </div>
          <button onClick={()=>{setCoachOpen(true);setCoachQ(null);}} style={{background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:".06em",padding:"6px 10px",borderRadius:4,flexShrink:0,marginTop:2}}>ASK →</button>
        </div>
      </div>

      {/* PRIMARY ACTION */}
      <button onClick={()=>setView("train")} className={`press ${!allDone&&!D.doneToday?"glowbtn":""}`} style={{width:"100%",background:allDone?C.green:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:".06em",padding:"17px 0",borderRadius:9,display:"flex",flexDirection:"column",alignItems:"center",gap:3,marginBottom:11,boxShadow:allDone?"none":"0 5px 26px #FF4D0040"}}>
        {allDone?"✓ SESSION COMPLETE":"START TODAY'S WORKOUT"}
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#000000"}}>
          {D.doneToday?"XP claimed":`${todayW.title} · ${todayW.est} · ${doneCnt}/${todayW.drills.length} done`}
        </span>
      </button>

      {/* POST WORKOUT COACH MESSAGE */}
      {postWorkoutMsg&&allDone&&D.doneToday&&(
        <div className="pop" style={{background:"#0A120D",border:`1px solid ${C.green}44`,borderRadius:7,padding:"10px 13px",marginBottom:10}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.green,letterSpacing:".14em",marginBottom:3}}>🤖 COACH FEEDBACK</div>
          <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:14,color:"#EEEEEE",lineHeight:1.4}}>{postWorkoutMsg}</div>
        </div>
      )}

      {/* ATHLETE CARD */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 14px",marginBottom:10,overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",right:-20,top:-20,width:120,height:120,background:`radial-gradient(circle,${rank.color}15,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:C.muted,letterSpacing:".14em",marginBottom:4}}>YOUR DUNK PLAN</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:".05em",lineHeight:1,marginBottom:6}}>{D.name}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              <Tag color={rank.color}>{rank.icon} {rank.name}</Tag>
              <Tag color={curLv.color}>{curLv.icon} {curLv.label}</Tag>
            </div>
          </div>
          <div style={{textAlign:"center",background:D.streak>0?`${theme.accent}14`:C.dim,border:`1px solid ${D.streak>0?theme.accent+"44":C.border}`,borderRadius:7,padding:"7px 10px",minWidth:50,flexShrink:0}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:D.streak>=7?theme.accent:D.streak>0?"#BBBBBB":"#252535",lineHeight:1}}>{D.streak}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:D.streak>0?theme.accent:C.muted,letterSpacing:".1em",marginTop:1}}>🔥 STREAK</div>
          </div>
        </div>
        <XPBar xp={D.xp}/>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {[
            {l:"SESSIONS",v:D.sessions},
            {l:"VERT",v:lastVert?`${lastVert}"`:`~${levelVert(curLv.id, D.height, D.standingReach)}"`},
            {l:"THIS MONTH",v:`${daysThisMonth}d`},
          ].map(s=>(
            <div key={s.l} style={{flex:1,background:C.dim,borderRadius:5,padding:"6px 0",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,lineHeight:1}}>{s.v}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,marginTop:2,letterSpacing:".08em"}}>{s.l}</div>
            </div>
          ))}
        </div>
        {lastDaysAgo!==null&&(
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:lastDaysAgo===0?C.green:lastDaysAgo<=1?C.muted:lastDaysAgo<=3?C.gold:C.red,marginTop:7}}>
            {lastDaysAgo===0?"Last session: today ✓":lastDaysAgo===1?"Last session: yesterday":`Last session: ${lastDaysAgo} days ago`}
          </div>
        )}
        {D.streak>0&&(
          <div style={{display:"flex",gap:2,marginTop:8}}>
            {Array.from({length:Math.min(D.streak,14)}).map((_,i)=>(
              <div key={i} style={{flex:1,height:2,background:theme.accent,borderRadius:1,opacity:.9-i*.04}}/>
            ))}
            {D.streak>14&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:theme.accent,marginLeft:3}}>+{D.streak-14}</span>}
          </div>
        )}
      </div>

      {/* DUNK PROGRESS */}
      <div style={{background:C.card,border:`1px solid ${gap===0?C.green+"55":theme.accent+"30"}`,borderRadius:10,padding:"13px 14px",marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:C.muted,letterSpacing:".14em"}}>PROGRESS TO DUNK</div>
          <button onClick={()=>setView("track")} style={{background:"none",border:"none",fontFamily:"'DM Mono',monospace",fontSize:9,color:theme.accent}}>LOG VERT →</button>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:9}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:C.muted,marginBottom:2}}>{gap>0?"INCHES FROM DUNKING":"YOU'RE READY"}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:42,letterSpacing:".04em",lineHeight:1,color:gap===0?C.green:theme.accent}}>{gap===0?"READY 👑":`${gap}"`}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>Vert · ~{snap.wkEst}wk</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:".04em"}}>{effVert}"</div>
          </div>
        </div>
        <div style={{height:7,background:C.dim,borderRadius:4,marginBottom:4}}>
          <div style={{height:7,width:`${pct}%`,background:`linear-gradient(90deg,${theme.accent},#FF8000)`,borderRadius:4,transition:"width .7s"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:theme.accent,letterSpacing:".04em"}}>{pct}% THERE</div>
          {nextLv&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:nextLv.color}}>NEXT: {nextLv.icon} {nextLv.label}</div>}
        </div>
        {/* Milestones */}
        <div style={{display:"flex",alignItems:"center",overflowX:"auto",paddingBottom:2}}>
          {LEVELS.slice(Math.max(0,D.level-2),Math.min(LEVELS.length,D.level+4)).map((lv,i,arr)=>{
            const passed=lv.id<D.level,cur=lv.id===D.level;
            return (
              <div key={lv.id} style={{display:"flex",alignItems:"center",flexShrink:0}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                  <div style={{width:cur?28:20,height:cur?28:20,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:passed?`${lv.color}30`:cur?`${lv.color}20`:C.dim,border:`2px solid ${passed||cur?lv.color:"#2A2A3A"}`,fontSize:cur?14:10,boxShadow:cur?`0 0 10px ${lv.color}55`:"",transition:"all .3s"}}>
                    {passed?"✓":lv.icon}
                  </div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:6,color:cur?lv.color:C.muted,textAlign:"center",maxWidth:36,lineHeight:1.2}}>{lv.label.split(" ")[0]}</div>
                </div>
                {i<arr.length-1&&<div style={{flex:1,height:2,background:passed?lv.color:C.dim,minWidth:8,marginBottom:12}}/>}
              </div>
            );
          })}
        </div>
        {/* Gain row */}
        <div style={{display:"flex",gap:6,marginTop:9}}>
          {weeklyGain!==null&&(
            <div style={{flex:1,background:weeklyGain>0?`${C.green}10`:`${C.red}10`,border:`1px solid ${weeklyGain>0?C.green:C.red}30`,borderRadius:5,padding:"6px 0",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:weeklyGain>0?C.green:C.red}}>{weeklyGain>0?"+":""}{weeklyGain}"</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>THIS WEEK</div>
            </div>
          )}
          {D.vertLogs.length>=2&&(()=>{const g=(D.vertLogs[D.vertLogs.length-1].v-D.vertLogs[0].v).toFixed(1);return parseFloat(g)>0?(
            <div style={{flex:1,background:`${C.green}10`,border:`1px solid ${C.green}28`,borderRadius:5,padding:"6px 0",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:C.green}}>+{g}"</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>ALL TIME</div>
            </div>
          ):null;})()}
          <div style={{flex:1,background:C.dim,borderRadius:5,padding:"6px 0",textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:C.gold}}>~{snap.wkEst}wk</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>EST.</div>
          </div>
        </div>
      </div>

      {/* DAILY CHALLENGE — unlocks at ROOKIE rank */}
      {(()=>{
        const chUnlocked = hasRank(D.xp, "ROOKIE");
        return (
          <div style={{background:chDone?"#0A130D":chUnlocked?C.card:"#0A0A10",border:`1px solid ${chDone?C.green+"44":chUnlocked?C.border:"#1A1A28"}`,borderRadius:9,padding:"11px 13px",marginBottom:10,opacity:chUnlocked?1:.75}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:chDone?C.green:chUnlocked?C.gold:C.muted,letterSpacing:".14em"}}>
                {chUnlocked?"⚡ DAILY CHALLENGE":"🔒 DAILY CHALLENGE"}
              </div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:chDone?C.green:chUnlocked?C.gold:C.muted}}>+{todayCh.xp} XP</span>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:18,opacity:chUnlocked?1:.4}}>{todayCh.icon}</span>
                <span style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:14,color:chDone?C.green:chUnlocked?"#F0F0F0":C.muted}}>{todayCh.label}</span>
              </div>
              {!chUnlocked
                ? <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,flexShrink:0}}>Reach ROOKIE to unlock</span>
                : !chDone
                  ? <button onClick={()=>{mut(prev=>({...prev,chDates:[...(prev.chDates||[]),today()],xp:(prev.xp||0)+todayCh.xp}));spawnXP(todayCh.xp);showT(`+${todayCh.xp} XP`);}} style={{background:C.gold,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:".08em",padding:"7px 13px",borderRadius:4,flexShrink:0}}>DONE</button>
                  : <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.green,flexShrink:0}}>✓ CLAIMED</span>
              }
            </div>
          </div>
        );
      })()}

      {/* SHARE */}
      {D.sessions > 0 && (
        <button onClick={()=>{
          const txt = [
            `🏀 DUNK LAB — My Progress`,
            `Vertical: ${lastVert?`${lastVert}"`:"tracking"}`,
            `${gap>0?`${gap}" from dunking`:"I can dunk 👑"}`,
            `${D.streak} day streak · ${D.sessions} sessions`,
            `Rank: ${rank.name} ${rank.icon}`,
          ].join("\n");
          // Clipboard API blocked in sandboxed iframes — use textarea fallback
          try {
            const ta = document.createElement("textarea");
            ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
            document.body.appendChild(ta); ta.focus(); ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            showT("✓ Stats copied to clipboard!");
          } catch {
            showT("Copy your stats from the text above");
          }
        }} style={{width:"100%",background:C.dim,border:`1px solid ${C.border}`,color:C.muted,fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".08em",padding:"10px 0",borderRadius:6,marginBottom:10}}>
          📤 SHARE MY STATS
        </button>
      )}
      {!D.isPro&&D.sessions>=1&&(
        <div style={{background:C.card,border:`1px solid ${theme.accent}22`,borderRadius:9,padding:"12px 14px"}}>
          <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:14,marginBottom:2}}>Want a clear path to dunking?</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,marginBottom:9}}>Most users gain 2–4" in 6 weeks with a structured program.</div>
          <button onClick={()=>setShowPro(true)} style={{width:"100%",background:`linear-gradient(90deg,${theme.accent},#FF7A00)`,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:".06em",padding:"12px 0",borderRadius:6,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            SEE THE 6-WEEK PROGRAM
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,opacity:.75}}>$4.99/mo · Cancel anytime</span>
          </button>
        </div>
      )}

      {/* ── COACH MODAL ──────────────────────────────────────────────────── */}
      {coachOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:998,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>{setCoachOpen(false);setCoachQ(null);setCoachTextReply(null);setCoachTyping(false);}}>
          <div className="slideup coachglow" style={{background:"#0D0D15",border:`1px solid ${theme.accent}55`,borderRadius:"14px 14px 0 0",width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",position:"relative",wordWrap:"break-word",overflowWrap:"break-word"}} onClick={e=>e.stopPropagation()}>

            {/* Header bar */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 16px 0"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:`${theme.accent}22`,border:`1px solid ${theme.accent}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🤖</div>
                <div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:".06em",lineHeight:1,wordBreak:"break-word"}}>COACH</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,marginTop:1,wordBreak:"break-word"}}>
                    {D.sessions} sessions · {wkSess} this wk · {gap>0?`${gap}" away`:"ready to dunk"}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {!D.isPro&&(
                  <div style={{background:coachQLeft===0?`${C.red}20`:`${theme.accent}18`,border:`1px solid ${coachQLeft===0?C.red+"55":theme.accent+"55"}`,borderRadius:5,padding:"4px 9px",textAlign:"center",minWidth:46}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:coachQLeft===0?C.red:theme.accent,lineHeight:1}}>{coachQLeft}/{3}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.label,letterSpacing:".06em"}}>LEFT</div>
                  </div>
                )}
                {/* X close button — always visible */}
                <button onClick={()=>{setCoachOpen(false);setCoachQ(null);setCoachTextReply(null);setCoachTyping(false);}} style={{background:"#1A1A24",border:`1px solid ${C.border}`,color:"#B8B8D0",borderRadius:6,width:32,height:32,minWidth:44,minHeight:44,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>✕</button>
              </div>
            </div>

            {/* Today's Assessment — memoized, never re-renders from typing */}
            <div style={{margin:"12px 16px 0",background:C.dim,borderRadius:8,padding:"11px 13px"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:theme.accent,letterSpacing:".14em",marginBottom:4}}>TODAY'S ASSESSMENT</div>
              <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:15,lineHeight:1.5,color:"#EEEEEE"}}>{dailyCoachMsg}</div>
            </div>

            {/* Stats row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,margin:"10px 16px 0"}}>
              {[
                {l:"INCHES AWAY", v:gap>0?`${gap}"`:"READY",   c:gap<=5?C.green:gap<=12?C.gold:theme.accent},
                {l:"THIS WEEK",   v:`${wkSess}x sessions`,       c:wkSess>=4?C.green:wkSess>=2?C.gold:C.red},
                {l:"WK GAIN",     v:weeklyGain!=null?`${weeklyGain>0?"+":""}${weeklyGain}"`:"—", c:weeklyGain&&weeklyGain>0?C.green:C.label},
              ].map(s=>(
                <div key={s.l} style={{background:"#0A0A12",border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 6px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:s.c,lineHeight:1}}>{s.v}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.label,marginTop:2,letterSpacing:".08em"}}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Content area */}
            <div style={{padding:"12px 16px 32px"}}>

              {/* ── TYPING INDICATOR ── */}
              {coachTyping&&(
                <div className="fade" style={{background:`${theme.accent}0E`,border:`1px solid ${theme.accent}30`,borderRadius:8,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:`${theme.accent}20`,border:`1px solid ${theme.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🤖</div>
                  <div style={{display:"flex",alignItems:"center",gap:0,paddingTop:3}}>
                    <span className="td1"/><span className="td2"/><span className="td3"/>
                  </div>
                </div>
              )}

              {/* ── ANSWER VIEW (quick question response) ── */}
              {!coachTyping && coachQ !== null && coachQ >= 0 && (
                <div className="fade">
                  {/* Question label */}
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:theme.accent,letterSpacing:".12em",marginBottom:8}}>
                    {COACH_Qs[coachQ]?.q.toUpperCase()}
                  </div>
                  {/* Response card */}
                  <div style={{background:`${theme.accent}0C`,border:`1px solid ${theme.accent}30`,borderRadius:9,padding:"14px 14px",marginBottom:10}}>
                    <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:`${theme.accent}20`,border:`1px solid ${theme.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,marginTop:1}}>🤖</div>
                      <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:16,color:"#EEEEEE",lineHeight:1.5}}>
                        {coachAnswer(snap, COACH_Qs[coachQ]?.key)}
                      </div>
                    </div>
                  </div>
                  {/* Suggested follow-ups */}
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.label,letterSpacing:".1em",marginBottom:6}}>FOLLOW-UP QUESTIONS</div>
                  <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                    {COACH_Qs.filter((_,i)=>i!==coachQ).slice(0,2).map(q=>(
                      <button key={q.key} onClick={()=>{setCoachTyping(true);setTimeout(()=>{setCoachQ(COACH_Qs.findIndex(x=>x.key===q.key));setCoachTyping(false);},850+Math.random()*300);}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 12px",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                        <span style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:13,color:"#EEEEEE"}}>{q.q}</span>
                        <span style={{color:theme.accent,fontSize:13,flexShrink:0}}>→</span>
                      </button>
                    ))}
                  </div>
                  {/* Back button */}
                  <button onClick={()=>{setCoachQ(null);setCoachTextReply(null);}} style={{width:"100%",background:"#14141E",border:`1px solid ${C.border}`,color:"#B8B8D0",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".08em",padding:"11px 0",borderRadius:6}}>← BACK TO QUESTIONS</button>
                </div>
              )}

              {/* ── TEXT REPLY VIEW ── */}
              {!coachTyping && coachQ === null && coachTextReply && (
                <div className="fade" style={{marginBottom:12}}>
                  <div style={{background:`${theme.accent}0C`,border:`1px solid ${theme.accent}30`,borderRadius:9,padding:"14px 14px",marginBottom:10}}>
                    <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:`${theme.accent}20`,border:`1px solid ${theme.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,marginTop:1}}>🤖</div>
                      <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:16,color:"#EEEEEE",lineHeight:1.5}}>{coachTextReply}</div>
                    </div>
                  </div>
                  <button onClick={()=>setCoachTextReply(null)} style={{width:"100%",background:"#14141E",border:`1px solid ${C.border}`,color:"#B8B8D0",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".08em",padding:"11px 0",borderRadius:6}}>← BACK TO QUESTIONS</button>
                </div>
              )}

              {/* ── LIMIT REACHED VIEW ── */}
              {coachQ === -1 && (
                <div className="fade" style={{marginBottom:12}}>
                  <div style={{background:`${theme.accent}10`,border:`1px solid ${theme.accent}44`,borderRadius:8,padding:"14px 14px",marginBottom:10}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:theme.accent,letterSpacing:".04em",marginBottom:6}}>DAILY LIMIT REACHED</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#B8B8D0",lineHeight:1.6,marginBottom:12}}>You've used your 3 free questions today. Upgrade to Pro for unlimited AI coach access — get answers anytime.</div>
                    <button onClick={()=>{setCoachOpen(false);setCoachQ(null);setShowPro(true);}} style={{width:"100%",background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:".1em",padding:"12px 0",borderRadius:6}}>UNLOCK UNLIMITED COACHING</button>
                  </div>
                  <button onClick={()=>setCoachQ(null)} style={{width:"100%",background:"#14141E",border:`1px solid ${C.border}`,color:"#B8B8D0",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".08em",padding:"11px 0",borderRadius:6}}>← BACK</button>
                </div>
              )}

              {/* ── QUESTION LIST (default view) ── */}
              {!coachTyping && coachQ === null && !coachTextReply && (
                <div>
                  {/* Text input */}
                  <div style={{marginBottom:14}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.label,letterSpacing:".12em",marginBottom:7}}>
                      ASK ANYTHING{!D.isPro&&coachQLeft===0?" — UPGRADE FOR UNLIMITED":""}
                    </div>
                    <div style={{display:"flex",gap:7}}>
                      <input
                        type="text"
                        placeholder={coachQLeft===0&&!D.isPro?"Daily limit reached — upgrade for more":"e.g. Why isn't my jump improving?"}
                        value={coachText}
                        disabled={coachQLeft===0&&!D.isPro}
                        onChange={e=>setCoachText(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Enter")submitCoachText();}}
                        style={{flex:1,fontSize:13,padding:"10px 12px",borderColor:coachText?theme.accent:C.border,opacity:coachQLeft===0&&!D.isPro?0.45:1,color:"#F0F0F0"}}
                      />
                      <button
                        onClick={submitCoachText}
                        disabled={!coachText.trim()||(coachQLeft===0&&!D.isPro)}
                        style={{background:coachText.trim()&&(coachQLeft>0||D.isPro)?theme.accent:"#1A1A24",color:coachText.trim()&&(coachQLeft>0||D.isPro)?"#000":"#B8B8D0",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:".08em",padding:"0 16px",borderRadius:5,flexShrink:0,transition:"all .15s"}}
                      >ASK</button>
                    </div>
                  </div>

                  {/* Quick questions */}
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.label,letterSpacing:".12em",marginBottom:7}}>QUICK QUESTIONS</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {COACH_Qs.map((q)=>(
                      <button key={q.key} onClick={()=>useCoachQ(q.key)} disabled={coachQLeft===0&&!D.isPro} style={{background:"#0E0E18",border:`1px solid ${C.border}`,borderRadius:7,padding:"12px 13px",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",opacity:coachQLeft===0&&!D.isPro?0.45:1,transition:"border-color .15s"}}>
                        <span style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:14,color:"#E8E8E8"}}>{q.q}</span>
                        <span style={{color:theme.accent,fontSize:14,flexShrink:0,marginLeft:8}}>→</span>
                      </button>
                    ))}
                  </div>

                  {/* Limit nudge */}
                  {coachQLeft===0&&!D.isPro&&(
                    <div className="pop" style={{background:`${theme.accent}0E`,border:`1px solid ${theme.accent}33`,borderRadius:7,padding:"11px 13px",marginTop:10}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:theme.accent,lineHeight:1.55,marginBottom:8}}>3 free questions used today. Come back tomorrow or upgrade for unlimited.</div>
                      <button onClick={()=>{setCoachOpen(false);setCoachQ(null);setShowPro(true);}} style={{background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:".08em",padding:"8px 18px",borderRadius:5}}>UNLOCK UNLIMITED</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── TRAIN ─────────────────────────────────────────────────────────────────
  const TrainView = (
    <div className="fade">
      {/* Today's Focus header */}
      <div style={{background:`${todayW.color}12`,border:`1px solid ${todayW.color}33`,borderRadius:7,padding:"8px 13px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:2}}>TODAY'S FOCUS</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:todayW.color,letterSpacing:".06em"}}>{todayFocus}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.gold,fontWeight:500}}>{doneCnt}/{todayW.drills.length}</div>
          {doneCnt<todayW.drills.length
            ?<div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted}}>~{Math.round(((todayW.drills.length-doneCnt)/todayW.drills.length)*parseInt(todayW.est))}min left</div>
            :<div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.green}}>all done ✓</div>
          }
        </div>
      </div>

      {/* Title */}
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:".04em",lineHeight:1,color:todayW.color,marginBottom:8}}>{todayW.title}</div>

      {/* Progress bar */}
      <div style={{height:4,background:C.dim,borderRadius:2,marginBottom:10}}>
        <div style={{height:4,width:`${(doneCnt/todayW.drills.length)*100}%`,background:todayW.color,borderRadius:2,transition:"width .4s"}}/>
      </div>

      {/* Already done today banner */}
      {D.doneToday&&(
        <div style={{background:`${C.green}10`,border:`1px solid ${C.green}33`,borderRadius:6,padding:"8px 12px",marginBottom:10}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.green}}>✓ Workout already completed today. Come back tomorrow.</div>
        </div>
      )}

      <button onClick={()=>setWhyOpen(w=>!w)} style={{background:"none",border:"none",fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,padding:0,marginBottom:8,display:"flex",alignItems:"center",gap:4}}>
        {whyOpen?"▾":"▸"} Why this works
      </button>
      {whyOpen&&(
        <div style={{background:C.dim,borderRadius:6,padding:"8px 11px",marginBottom:8,borderLeft:`3px solid ${todayW.color}`}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,lineHeight:1.5}}>{["Plyometrics train fast-twitch fibers — the ones that move you off the ground.","Hip and leg strength is the engine behind every inch of vertical.","First-step speed translates directly to on-court explosiveness.","Dedicated vertical session — every drill designed to add inches."][new Date().getDay()%4]}</div>
        </div>
      )}
      <div style={{background:`${todayW.color}09`,border:`1px solid ${todayW.color}22`,borderRadius:6,padding:"8px 11px",marginBottom:9}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:todayW.color,letterSpacing:".14em",marginBottom:2}}>🔥 WARMUP FIRST</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#C8C8C8",lineHeight:1.6}}>{todayW.warmup}</div>
      </div>
      {todayW.drills.map(d=>{
        const k = `${wkey}-${d.name}`;
        const done = !!drillsDone[k];
        const skipped = skipDrill===k;
        return (
          <div key={k} className={done?"doneglow":""} style={{background:done?"#0A130D":skipped?"#130A0A":C.card,border:`1px solid ${done?"#2A5A32":skipped?C.red+"30":C.border}`,borderRadius:7,padding:"11px 12px",marginBottom:6,transition:"all .25s",opacity:done?0.85:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  {done&&<span style={{fontSize:13,color:C.green}}>✓</span>}
                  <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:18,color:done?C.green:skipped?"#9A6060":"#F0F0F0"}}>{d.name}</div>
                </div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:C.muted}}>{d.sets} × {d.reps}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:todayW.color,marginTop:3,opacity:.9}}>💡 {d.tip}</div>
                <DrillInstructions drill={d} accentColor={accentColor}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
                {/* EXPLOIT FIX: once done, button is disabled and locked */}
                <button
                  disabled={done}
                  onClick={()=>{
                    if (done) return; // hard block — can't undo
                    // XP only awarded if not already given for this drill today
                    if (!drillAlreadyGaveXP(d.name)) {
                      mut(prev => {
                        const newDates = {...(prev.drillXpDates||{})};
                        newDates[drillXpKey(d.name)] = true;
                        return {...prev, xp:(prev.xp||0)+10, drillXpDates:newDates};
                      });
                      spawnXP(10);
                    }
                    setDrillsDone(s=>({...s,[k]:true})); // one-way: only set to true
                    setSkipDrill(null);
                  }}
                  style={{
                    background:done?C.green:C.dim,
                    border:`1px solid ${done?C.green:C.border}`,
                    color:done?"#000":"#B8B8D0",
                    borderRadius:5,padding:"7px 10px",
                    fontFamily:"'DM Mono',monospace",fontSize:15,letterSpacing:".08em",
                    transition:"all .2s",
                    cursor:done?"default":"pointer",
                    opacity:done?1:1,
                  }}
                >
                  {done?"✓ COMPLETED":"DONE"}
                </button>
                {!done&&skipDrill!==k&&<button onClick={()=>setSkipDrill(k)} style={{background:"none",border:"none",fontFamily:"'DM Mono',monospace",fontSize:14,color:C.muted,padding:"2px 0",textAlign:"center"}}>SKIP</button>}
                {skipDrill===k&&(
                  <select defaultValue="" onChange={e=>{if(e.target.value){setSkipDrill(null);showT("Logged.");}}} style={{fontSize:9,padding:"4px 6px",borderRadius:4,color:C.muted,background:C.card,border:`1px solid ${C.border}`,width:70}}>
                    <option value="">reason</option>
                    <option value="fatigue">Fatigue</option>
                    <option value="sore">Soreness</option>
                    <option value="time">No time</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div style={{background:`${C.cyan}08`,border:`1px solid ${C.cyan}22`,borderRadius:6,padding:"8px 11px",marginTop:4,marginBottom:9}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.cyan,letterSpacing:".14em",marginBottom:2}}>❄️ COOL DOWN</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#C8C8C8",lineHeight:1.6}}>{todayW.cool}</div>
      </div>
      {allDone&&(
        <div className="pop" style={{background:"#0A130D",border:`1px solid ${C.green}`,borderRadius:8,padding:"15px",textAlign:"center"}}>
          <div style={{fontSize:26,marginBottom:5}}>🎉</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.green,letterSpacing:".06em",marginBottom:7}}>WORKOUT COMPLETE!</div>
          {!D.doneToday&&(
            <button onClick={markDone} style={{background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:".1em",padding:"11px 26px",borderRadius:5}}>CLAIM +60 XP 🔥</button>
          )}
          {D.doneToday&&(
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.green,marginBottom:8}}>✓ XP claimed — see you tomorrow</div>
              {postWorkoutMsg&&<div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:13,color:"#BBBBBB",lineHeight:1.4,padding:"8px 12px",background:C.dim,borderRadius:5}}>{postWorkoutMsg}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ── TRACK ─────────────────────────────────────────────────────────────────
  const TrackView = (
    <div className="fade">
      <div style={{marginBottom:16}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:C.muted,letterSpacing:".18em",marginBottom:4}}>YOUR NUMBERS</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:".04em",lineHeight:1}}>TRACK</div>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:14}}>
        {[["vert","VERTICAL"],["sprint","SPRINTS"],["level","LEVEL"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTSub(k)} style={{background:tSub===k?theme.accent:"#111",color:tSub===k?"#000":"#B8B8D0",border:`1px solid ${tSub===k?theme.accent:C.border}`,fontFamily:"'DM Mono',monospace",fontSize:13,letterSpacing:".08em",padding:"7px 14px",borderRadius:4,whiteSpace:"nowrap",transition:"all .15s"}}>{l}</button>
        ))}
      </div>

      {tSub==="vert"&&(
        <div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:14,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,letterSpacing:".12em",marginBottom:3}}>VERTICAL JUMP</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:theme.accent,lineHeight:1}}>{lastVert||"—"}<span style={{fontSize:12,color:C.muted,fontFamily:"'DM Mono',monospace",marginLeft:3}}>in</span></div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <input type="number" step=".5" min="0" placeholder="—" value={vertInput} onChange={e=>setVertInput(e.target.value)} style={{width:72,fontSize:20,padding:"8px 10px",textAlign:"right",borderColor:vertInput?theme.accent:C.border}}/>
                <button onClick={logVert} disabled={!vertInput} style={{background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:".08em",padding:"0 12px",borderRadius:4,opacity:vertInput?1:.3,height:40}}>LOG</button>
              </div>
            </div>
            {/* Dynamic feedback after logging */}
          {vertFeedback&&(
            <div className="pop" style={{background:vertFeedback.positive?`${C.green}10`:`${theme.accent}10`,border:`1px solid ${vertFeedback.positive?C.green:theme.accent}33`,borderRadius:6,padding:"9px 11px",marginTop:8}}>
              <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:14,color:vertFeedback.positive?C.green:theme.accent,lineHeight:1.4}}>{vertFeedback.msg}</div>
              <button onClick={()=>setVertFeedback(null)} style={{background:"none",border:"none",fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted,marginTop:4,padding:0}}>dismiss</button>
            </div>
          )}
          <VertChart logs={D.vertLogs} accentColor={accentColor}/>
            {D.vertLogs.length===1&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,marginTop:4}}>Log a second measurement to see your graph.</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[
              {l:"PERSONAL BEST",     v:bestVert?`${bestVert}"`:"—",   c:C.gold},
              {l:"ALL-TIME GAIN",     v:D.vertLogs.length>=2?`+${(D.vertLogs[D.vertLogs.length-1].v-D.vertLogs[0].v).toFixed(1)}"` :"—",c:C.green},
              {l:"THIS WEEK",         v:weeklyGain!==null?`${weeklyGain>0?"+":""}${weeklyGain}"`:"—",c:weeklyGain&&weeklyGain>0?C.green:C.muted},
              {l:"THIS MONTH",        v:monthlyGain!==null?`${monthlyGain>0?"+":""}${monthlyGain}"`:"—",c:monthlyGain&&monthlyGain>0?C.green:C.muted},
            ].map(s=>(
              <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:"10px 11px"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".1em",marginBottom:4}}>{s.l}</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:s.c,letterSpacing:".04em"}}>{s.v}</div>
              </div>
            ))}
          </div>
          {/* Coach insight — unlocks at VARSITY rank */}
          {D.vertLogs.length>=2&&(
            hasRank(D.xp,"VARSITY") ? (
              <div style={{background:`${theme.accent}09`,border:`1px solid ${theme.accent}25`,borderRadius:6,padding:"9px 11px"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:theme.accent,letterSpacing:".12em",marginBottom:3}}>🤖 COACH INSIGHT</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.5}}>
                  {coachAnswer(snap,"vert_improving")}
                </div>
              </div>
            ) : (
              <div style={{background:C.dim,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 11px",opacity:.6}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted,letterSpacing:".12em",marginBottom:3}}>🔒 COACH INSIGHT</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted}}>Reach VARSITY rank to unlock AI insights on your vertical progress.</div>
              </div>
            )
          )}
          {D.vertLogs.length===0&&(
            <div style={{textAlign:"center",padding:"28px 16px",border:`1px dashed ${C.border}`,borderRadius:8,marginBottom:10}}>
              <div style={{fontSize:32,marginBottom:8}}>📊</div>
              <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:16,marginBottom:4}}>No vertical logs yet</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.6}}>Log your first vertical above to unlock your progress graph. First workout unlocks training insights.</div>
            </div>
          )}
        </div>
      )}

      {tSub==="sprint"&&(
        <div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:14,marginBottom:10}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".14em",marginBottom:9}}>LOG SPRINT <span style={{color:C.gold}}>+20 XP</span></div>
            {Object.keys(sprintPBs).length > 0 && (
              <div style={{display:"flex",gap:5,marginBottom:10,overflowX:"auto"}}>
                {Object.entries(sprintPBs).map(([dist,time])=>(
                  <div key={dist} style={{background:C.dim,borderRadius:5,padding:"5px 9px",textAlign:"center",flexShrink:0}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:C.gold}}>{time}s</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>{dist}yd PB</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{display:"flex",gap:5,marginBottom:9}}>
              {["10","20","40","100"].map(dist=>(
                <button key={dist} onClick={()=>setSprintInput(s=>({...s,dist}))} style={{flex:1,background:sprintInput.dist===dist?C.gold:"#0C0C14",color:sprintInput.dist===dist?"#000":"#444",border:`1px solid ${sprintInput.dist===dist?C.gold:C.border}`,fontFamily:"'DM Mono',monospace",fontSize:10,padding:"7px 0",borderRadius:4}}>{dist}yd</button>
              ))}
            </div>
            <div style={{display:"flex",gap:7}}>
              <input type="number" step=".01" min="0" placeholder="Time (s)" value={sprintInput.time} onChange={e=>setSprintInput(s=>({...s,time:e.target.value}))} style={{flex:1,fontSize:20,padding:"10px 12px",borderColor:C.border}}/>
              <button onClick={logSprint} disabled={!sprintInput.time} style={{background:C.gold,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:".08em",padding:"0 16px",borderRadius:4,opacity:sprintInput.time?1:.3}}>LOG</button>
            </div>
          </div>
          {D.sprints.length===0&&(
            <div style={{textAlign:"center",padding:"28px 16px",border:`1px dashed ${C.border}`,borderRadius:8}}>
              <div style={{fontSize:32,marginBottom:8}}>⚡</div>
              <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:19,marginBottom:4}}>No sprints logged yet</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>Log your first sprint above. Speed training directly improves court explosiveness.</div>
            </div>
          )}
          {D.sprints.length>0&&D.sprints.slice().reverse().slice(0,10).map((s,i)=>(
            <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:5,padding:"10px 12px",display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.gold}}>{s.time}s <span style={{fontSize:12,color:C.muted}}>({s.dist}yd)</span></span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>{fmtDate(s.date).toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}

      {tSub==="level"&&(
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,marginBottom:9}}>Update when you hit a new milestone. Adjusts your workout difficulty.</div>
          {LEVELS.map(lv=>(
            <button key={lv.id} onClick={()=>{mut(prev=>({...prev,level:lv.id}));showT(`Level updated: ${lv.label}`);}} style={{background:D.level===lv.id?`${lv.color}18`:C.card,border:`1px solid ${D.level===lv.id?lv.color:C.border}`,borderRadius:6,padding:"11px 12px",display:"flex",alignItems:"center",gap:12,transition:"all .15s",width:"100%",marginBottom:5}}>
              <span style={{fontSize:18,minWidth:24}}>{lv.icon}</span>
              <div style={{flex:1,textAlign:"left"}}>
                <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:17,color:D.level===lv.id?lv.color:"#F0F0F0"}}>{lv.label}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>~{levelVert(lv.id, D.height, D.standingReach)}" vertical</div>
              </div>
              {D.level===lv.id&&<span style={{color:lv.color,fontSize:12,fontFamily:"'DM Mono',monospace"}}>CURRENT</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // ── RANK ──────────────────────────────────────────────────────────────────
  const BADGES_DEF = [
    {icon:"🏀",label:"FIRST SESSION",  unlocked:D.sessions>=1,   desc:"Complete first workout",       reward:"+50 XP on unlock"},
    {icon:"🔥",label:"3-DAY STREAK",   unlocked:D.streak>=3,     desc:"Train 3 days in a row",         reward:"+75 XP on unlock"},
    {icon:"⚡",label:"WEEK WARRIOR",   unlocked:D.streak>=7,     desc:"7-day training streak",         reward:"+100 XP on unlock"},
    {icon:"🤙",label:"TOUCHES RIM",    unlocked:D.vertLogs.some(v=>v.v>=levelVert(4,D.height,D.standingReach)), desc:`Vertical reaches ~${levelVert(4,D.height,D.standingReach)}\"`,  reward:"+75 XP on unlock"},
    {icon:"💥",label:"GOT HOPS",       unlocked:D.vertLogs.some(v=>v.v>=levelVert(6,D.height,D.standingReach)), desc:`Vertical reaches ~${levelVert(6,D.height,D.standingReach)}\"`,  reward:"+100 XP on unlock"},
    {icon:"👑",label:"DUNKER",         unlocked:D.vertLogs.some(v=>v.v>=levelVert(8,D.height,D.standingReach)), desc:"Can dunk",               reward:"+200 XP on unlock"},
    {icon:"💪",label:"10 SESSIONS",    unlocked:D.sessions>=10,  desc:"10 workouts completed",         reward:"+100 XP on unlock"},
    {icon:"🌟",label:"PRO MEMBER",     unlocked:D.isPro,         desc:"Upgraded to Pro",               reward:"+75 XP on unlock"},
  ];
  const allBadgesUnlocked = BADGES_DEF.every(b=>b.unlocked);
  const unlockedCount = BADGES_DEF.filter(b=>b.unlocked).length;
  const allBadgesBonusClaimed = !!(raw.allBadgesBonusClaimed || false);

  // Rank rewards — what you unlock at each tier
  const RankView = (
    <div className="fade">
      <div style={{marginBottom:14}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted,letterSpacing:".18em",marginBottom:4}}>YOUR PROGRESSION</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:".04em",lineHeight:1}}>RANK & XP</div>
      </div>

      {/* Rank hero card */}
      <div style={{background:`linear-gradient(160deg,#0D0D16,${rank.color}18)`,border:`2px solid ${rank.color}55`,borderRadius:10,padding:"20px 15px",textAlign:"center",marginBottom:13,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,background:`radial-gradient(circle,${rank.color}22,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{fontSize:48,marginBottom:6}}>{rank.icon}</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:rank.color,letterSpacing:".06em",lineHeight:1,marginBottom:2}}>{rank.name}</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,marginBottom:10,lineHeight:1.5}}>{RANK_REWARDS[rank.name]}</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:C.gold,letterSpacing:".05em",marginBottom:13}}>{D.xp.toLocaleString()} XP</div>
        <XPBar xp={D.xp}/>
        {/* Next rank preview */}
        {(() => { const p=xpProg(D.xp); return p.next!=="MAX"&&(
          <div style={{marginTop:10,fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted}}>
            {p.needed} XP to <span style={{color:"#F0F0F0"}}>{p.next}</span>
          </div>
        );})()}
      </div>

      {/* Sunday Weekly Summary */}
      {weeklySummary&&(
        <div className="pop" style={{background:`${C.cyan}0C`,border:`1px solid ${C.cyan}44`,borderRadius:8,padding:"13px 14px",marginBottom:13}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.cyan,letterSpacing:".14em",marginBottom:8}}>📅 WEEKLY SUMMARY</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:".03em",marginBottom:4}}>
            {weeklySummary.wg&&weeklySummary.wg>0?`+${weeklySummary.wg}" this week. `:""}{weeklySummary.ws} session{weeklySummary.ws!==1?"s":""} completed.
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.55}}>
            {weeklySummary.gap}" remaining · ~{weeklySummary.wkEst} weeks estimated · {weeklySummary.ws>=4?"You're on pace.":"Push for 4+ sessions next week."}
          </div>
        </div>
      )}

      {/* Weekly report — unlocks at STARTER rank */}
      {hasRank(D.xp,"STARTER") ? (
        <div style={{background:C.card,border:`1px solid ${C.cyan}33`,borderRadius:8,padding:"13px 14px",marginBottom:13}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.cyan,letterSpacing:".14em",marginBottom:10}}>📊 WEEKLY PERFORMANCE</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:10}}>
            {[
              {l:"SESSIONS",v:`${weeklyReport.wkSessions}`,c:weeklyReport.wkSessions>=4?C.green:weeklyReport.wkSessions>=2?C.gold:C.red},
              {l:"VERT GAIN",v:weeklyReport.wkGain!==null?`${weeklyReport.wkGain>0?"+":""}${weeklyReport.wkGain}"`:"—",c:weeklyReport.wkGain&&weeklyReport.wkGain>0?C.green:C.muted},
              {l:"DUNK ETA",v:`~${snap.wkEst}wk`,c:C.gold},
            ].map(s=>(
              <div key={s.l} style={{background:C.dim,borderRadius:5,padding:"8px 0",textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:s.c,lineHeight:1}}>{s.v}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,marginTop:2,letterSpacing:".1em"}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.55,borderTop:`1px solid ${C.dim}`,paddingTop:8}}>
            🤖 {weeklyReport.assessment}
          </div>
        </div>
      ) : (
        <div style={{background:C.dim,border:`1px solid ${C.border}`,borderRadius:8,padding:"13px 14px",marginBottom:13,opacity:.55}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:C.muted,letterSpacing:".14em",marginBottom:6}}>🔒 WEEKLY PERFORMANCE REPORT</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>Reach STARTER rank to unlock your weekly performance breakdown.</div>
        </div>
      )}

      {/* XP earn guide */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 13px",marginBottom:13}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:9}}>HOW TO EARN XP</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
          {[["Complete workout","+60 XP"],["Each drill done","+10 XP"],["Log vertical","+25 XP"],["Log sprint","+20 XP"],["7-day streak","+100 XP"],["Daily challenge","+20–40 XP"],["Phase complete","+100 XP"],["Badge unlocked","+50–200 XP"]].map(([a,b])=>(
            <div key={a} style={{background:C.dim,borderRadius:4,padding:"7px 9px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>{a}</span>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:C.gold,letterSpacing:".04em"}}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements — with rewards shown + all-badges reward */}
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:7}}>
        ACHIEVEMENTS — {unlockedCount}/{BADGES_DEF.length} UNLOCKED
      </div>
      {/* All-badges reward banner */}
      {allBadgesUnlocked ? (
        <div className="pop" style={{background:`linear-gradient(135deg,${C.gold}18,${theme.accent}12)`,border:`2px solid ${C.gold}`,borderRadius:8,padding:"13px 14px",marginBottom:10,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>🏆</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.gold,letterSpacing:".06em",marginBottom:2}}>ALL BADGES COMPLETE</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,marginBottom:8}}>You've hit every milestone. Elite status achieved.</div>
          {!allBadgesBonusClaimed ? (
            <button onClick={()=>{mut(prev=>({...prev,xp:(prev.xp||0)+500,allBadgesBonusClaimed:true}));spawnXP(500);showT("🏆 +500 XP BONUS!");}} style={{background:C.gold,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:".08em",padding:"8px 16px",borderRadius:4}}>CLAIM +500 XP</button>
          ) : (
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.green}}>✓ Bonus claimed</div>
          )}
        </div>
      ) : (
        <div style={{background:C.dim,border:`1px solid ${C.border}`,borderRadius:7,padding:"10px 12px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>Complete all badges for</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:C.gold}}>🏆 +500 XP BONUS</div>
          </div>
          <div style={{height:4,background:"#1A1A26",borderRadius:2}}>
            <div style={{height:4,width:`${(unlockedCount/BADGES_DEF.length)*100}%`,background:`linear-gradient(90deg,${C.gold},${theme.accent})`,borderRadius:2,transition:"width .5s"}}/>
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,marginTop:4}}>{BADGES_DEF.length-unlockedCount} badge{BADGES_DEF.length-unlockedCount!==1?"s":""} remaining</div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:13}}>
        {BADGES_DEF.map(b=><BadgeCard key={b.label} b={b}/>)}
      </div>

      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,letterSpacing:".14em",marginBottom:7}}>RANK LADDER</div>
      {RANKS.map(r=>{
        const cur=r.name===rank.name, un=D.xp>=r.min, p=xpProg(D.xp);
        return <RankCard key={r.name} r={r} cur={cur} un={un} p={p} reward={RANK_REWARDS[r.name]}/>;
      })}
    </div>
  );

  // ── PROGRAM ───────────────────────────────────────────────────────────────
  const ProgramView = (
    <div className="fade">
      <div style={{marginBottom:13}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted,letterSpacing:".18em",marginBottom:4}}>STRUCTURED TRAINING</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:".04em",lineHeight:1}}>PROGRAM</div>
      </div>

      {!D.isPro ? (
        /* ── FREE PREVIEW ── */
        <div>
          <div style={{display:"flex",gap:0,marginBottom:12}}>
            {[{w:"WK 1–2",p:"Foundation",c:theme.accent},{w:"WK 3–4",p:"Overload",c:C.cyan},{w:"WK 5–6",p:"Peak",c:"#FF0040"}].map((ph,i)=>(
              <div key={ph.w} style={{display:"flex",alignItems:"center",flex:1}}>
                <div style={{flex:1,background:`${ph.c}12`,border:`1px solid ${ph.c}38`,borderRadius:5,padding:"8px 5px",textAlign:"center"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:ph.c,letterSpacing:".06em"}}>{ph.w}</div>
                  <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:12,marginTop:1}}>{ph.p}</div>
                </div>
                {i<2&&<div style={{width:4,height:2,background:C.muted,flexShrink:0}}/>}
              </div>
            ))}
          </div>
          <div style={{background:C.card,border:`1px solid ${theme.accent}22`,borderRadius:8,padding:"13px 14px",marginBottom:10}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".14em",marginBottom:9}}>WHAT'S INSIDE PRO</div>
            {[["🏋️","6-Week Jump Program","3 progressive phases, 5 drills each"],["💪","Gym Splits (Push/Pull/Legs)","Synced to your jump phase"],["❄️","Recovery Days","Mobility, foam rolling, tendon care"],["⚡","Weekly Challenges","3 goals each week with XP rewards"],["🛡️","Streak Shield","1 free missed day per week"],["📊","Weekly Report","Every Sunday — sessions, gains, timeline"]].map(([ico,t,d])=>(
              <div key={t} style={{display:"flex",gap:10,marginBottom:9,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>{ico}</span>
                <div>
                  <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:16,letterSpacing:".03em"}}>{t}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.5}}>{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:`${theme.accent}09`,border:`1px solid ${theme.accent}28`,borderRadius:7,padding:"10px 12px",marginBottom:11}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,lineHeight:1.6}}>Most users gain <strong style={{color:"#F0F0F0"}}>2–4 inches</strong> in 6 weeks with structured training vs ~0.5" with random workouts.</div>
          </div>
          <button onClick={()=>setShowPro(true)} style={{width:"100%",background:`linear-gradient(135deg,${theme.accent},#FF7A00)`,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:".1em",padding:"14px 0",borderRadius:7,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            UNLOCK FULL PROGRAM
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,opacity:.8}}>$4.99/mo · Cancel anytime</span>
          </button>
        </div>
      ) : (
        /* ── PRO VIEW ── */
        <div>
          {/* Pro tab bar */}
          <div style={{display:"flex",gap:4,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
            {[{id:"program",label:"PROGRAM"},
              {id:"gym",    label:"GYM SPLITS"},
              {id:"recovery",label:"RECOVERY"},
              {id:"challenges",label:"CHALLENGES"},
              {id:"report", label:"WEEKLY REPORT"},
            ].map(t=>(
              <button key={t.id} onClick={()=>setProTab(t.id)} style={{background:proTab===t.id?theme.accent:"#111",color:proTab===t.id?"#000":"#B8B8D0",border:`1px solid ${proTab===t.id?theme.accent:C.border}`,fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".06em",padding:"6px 12px",borderRadius:4,whiteSpace:"nowrap",flexShrink:0,transition:"all .15s"}}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── PROGRAM TAB ── */}
          {proTab==="program"&&(
            <div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 11px",marginBottom:10}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.6}}>Each phase builds on the previous. Don't skip ahead — the foundation matters.</div>
              </div>
              <div style={{display:"flex",gap:0,marginBottom:12}}>
                {PRO_WEEKS.map((w,i)=>{
                  const prevPhaseDone = i===0||PRO_WEEKS[i-1].drills.every(d=>!!drillsDone[`pro-${i-1}-${d.name}`]);
                  const isActive = proWeek===i;
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
                      <button onClick={()=>{if(!prevPhaseDone){showT(`🔒 Finish ${PRO_WEEKS[i-1].phase} first`);return;}setProWeek(i);}}
                        style={{flex:1,background:isActive?`${w.color}20`:prevPhaseDone?"#111":"#0A0A0E",border:`1px solid ${isActive?w.color:prevPhaseDone?C.border:"#1A1A22"}`,color:isActive?w.color:prevPhaseDone?"#B8B8D0":"#5A5A68",borderRadius:5,padding:"8px 4px",textAlign:"center",transition:"all .15s",position:"relative"}}>
                        {!prevPhaseDone&&<span style={{fontSize:10,position:"absolute",top:4,right:5}}>🔒</span>}
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:".05em"}}>{w.week}</div>
                        <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:14,marginTop:1}}>{w.phase}</div>
                      </button>
                      {i<PRO_WEEKS.length-1&&<div style={{width:4,height:2,background:C.border,flexShrink:0}}/>}
                    </div>
                  );
                })}
              </div>
              {(()=>{const w=PRO_WEEKS[proWeek];return(
                <div>
                  <div style={{background:`${w.color}0E`,border:`1px solid ${w.color}33`,borderRadius:6,padding:"8px 11px",marginBottom:10}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:w.color,lineHeight:1.5}}>{w.note}</div>
                  </div>
                  {w.drills.map(d=>{const k=`pro-${proWeek}-${d.name}`,done=!!drillsDone[k];return(
                    <div key={k} className={done?"doneglow":""} style={{background:done?"#0A130D":C.card,border:`1px solid ${done?"#2A5A32":C.border}`,borderRadius:7,padding:"11px 12px",marginBottom:6,transition:"all .25s",opacity:done?0.85:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                            {done&&<span style={{fontSize:13,color:C.green}}>✓</span>}
                            <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:18,color:done?C.green:"#F0F0F0"}}>{d.name}</div>
                          </div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>{d.sets} × {d.reps}</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:w.color,marginTop:3,opacity:.9}}>💡 {d.tip}</div>
                          <DrillInstructions drill={d} accentColor={accentColor}/>
                        </div>
                        <button disabled={done} onClick={()=>{
                          if(done)return;
                          if(!drillAlreadyGaveXP(k)){mut(prev=>{const nd={...(prev.drillXpDates||{})};nd[drillXpKey(k)]=true;return{...prev,xp:(prev.xp||0)+10,drillXpDates:nd};});spawnXP(10);}
                          const newDone={...drillsDone,[k]:true};setDrillsDone(newDone);
                          const allPhaseDone=w.drills.every(dr=>newDone[`pro-${proWeek}-${dr.name}`]);
                          if(allPhaseDone){const bk=`pro_phase_${proWeek}`;if(!(raw.proPhasesClaimed||[]).includes(bk)){mut(prev=>({...prev,xp:(prev.xp||0)+100,proPhasesClaimed:[...(prev.proPhasesClaimed||[]),bk]}));spawnXP(100);setTimeout(()=>triggerM(`${["FOUNDATION","OVERLOAD","PEAK"][proWeek]} COMPLETE 🏆`,`+100 XP · ${["Base is built. Move to Week 3–4.","Overload done. Peak week is your final push.","6 WEEKS COMPLETE. Go log your vertical."][proWeek]}`),300);}}
                        }} style={{background:done?C.green:C.dim,border:`1px solid ${done?C.green:C.border}`,color:done?"#000":"#B8B8D0",borderRadius:5,padding:"7px 10px",fontFamily:"'DM Mono',monospace",fontSize:12,letterSpacing:".08em",transition:"all .15s",flexShrink:0,cursor:done?"default":"pointer"}}>
                          {done?"✓ COMPLETED":"DONE"}
                        </button>
                      </div>
                    </div>
                  );})}
                  {w.drills.every(dr=>!!drillsDone[`pro-${proWeek}-${dr.name}`])&&(
                    <div className="pop" style={{background:"#0A130D",border:`1px solid ${C.green}`,borderRadius:8,padding:"14px 16px",marginTop:6,textAlign:"center"}}>
                      <div style={{fontSize:26,marginBottom:5}}>{["🏗️","⚡","👑"][proWeek]}</div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.green,letterSpacing:".06em",marginBottom:4}}>{["FOUNDATION COMPLETE","OVERLOAD COMPLETE","PROGRAM COMPLETE 🎉"][proWeek]}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.6,marginBottom:proWeek<2?8:0}}>{["Reactive base is built. Move to Week 3–4 when ready.","Strength done. Peak week is your final push.","All 6 weeks complete. Log your vertical now."][proWeek]}</div>
                      {proWeek<PRO_WEEKS.length-1&&<button onClick={()=>setProWeek(proWeek+1)} style={{background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:".08em",padding:"9px 20px",borderRadius:5}}>START {["OVERLOAD PHASE →","PEAK PHASE →"][proWeek]}</button>}
                    </div>
                  )}
                </div>
              );})()}
            </div>
          )}

          {/* ── GYM SPLITS TAB ── */}
          {proTab==="gym"&&(
            <div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 12px",marginBottom:10}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.5}}>Gym training synced to your jump phase. Each phase gets heavier — don't skip Foundation.</div>
              </div>
              {/* Phase selector with locks */}
              <div style={{display:"flex",gap:0,marginBottom:12}}>
                {GYM_SPLITS.map((g,i)=>{
                  const prevGymDone = i===0 || ["push","pull","legs"].every(sp=>
                    GYM_SPLITS[i-1][sp].drills.every(d=>!!drillsDone[`gym-${i-1}-${sp}-${d.name}`])
                  );
                  const isActive = gymPhase===i;
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
                      <button onClick={()=>{
                        if(!prevGymDone){showT(`🔒 Finish ${GYM_SPLITS[i-1].phase.split(" ")[0]} first`);return;}
                        setGymPhase(i);
                      }} style={{flex:1,background:isActive?`${C.purple}22`:prevGymDone?"#111":"#0A0A0E",border:`1px solid ${isActive?C.purple:prevGymDone?C.border:"#1A1A22"}`,color:isActive?C.purple:prevGymDone?"#B8B8D0":"#5A5A68",borderRadius:5,padding:"7px 4px",textAlign:"center",transition:"all .15s",position:"relative",fontSize:1}}>
                        {!prevGymDone&&<span style={{fontSize:9,position:"absolute",top:3,right:4}}>🔒</span>}
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:".04em"}}>{g.phase.split("(")[0].trim()}</div>
                      </button>
                      {i<GYM_SPLITS.length-1&&<div style={{width:3,height:2,background:C.border,flexShrink:0}}/>}
                    </div>
                  );
                })}
              </div>
              {/* Push/Pull/Legs tabs */}
              <div style={{display:"flex",gap:5,marginBottom:12}}>
                {["push","pull","legs"].map(s=>(
                  <button key={s} onClick={()=>setGymSplit(s)} style={{flex:1,background:gymSplit===s?C.purple:"#111",color:gymSplit===s?"#FFF":"#B8B8D0",border:`1px solid ${gymSplit===s?C.purple:C.border}`,fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:".08em",padding:"8px 0",borderRadius:4,textTransform:"uppercase",transition:"all .15s"}}>
                    {s}
                  </button>
                ))}
              </div>
              {(()=>{
                const phase = GYM_SPLITS[gymPhase];
                const split = phase[gymSplit];
                const allSplitsDone = ["push","pull","legs"].every(sp=>
                  GYM_SPLITS[gymPhase][sp].drills.every(d=>!!drillsDone[`gym-${gymPhase}-${sp}-${d.name}`])
                );
                const gymBadgeKey = `gym_phase_${gymPhase}`;
                return (
                  <div>
                    <div style={{background:`${C.purple}12`,border:`1px solid ${C.purple}33`,borderRadius:7,padding:"9px 12px",marginBottom:10}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.purple,letterSpacing:".12em",marginBottom:2}}>{phase.phase}</div>
                      <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:18}}>{split.name}</div>
                    </div>
                    {split.drills.map((d,i)=>{
                      const k=`gym-${gymPhase}-${gymSplit}-${d.name}`,done=!!drillsDone[k];
                      return (
                        <div key={i} className={done?"doneglow":""} style={{background:done?"#0A130D":C.card,border:`1px solid ${done?"#2A5A32":C.border}`,borderRadius:7,padding:"11px 12px",marginBottom:6,transition:"all .25s"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                            <div style={{flex:1}}>
                              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                                {done&&<span style={{fontSize:13,color:C.green}}>✓</span>}
                                <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:18,color:done?C.green:"#F0F0F0"}}>{d.name}</div>
                              </div>
                              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>{d.sets} × {d.reps}</div>
                              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.purple,marginTop:3,opacity:.9}}>💡 {d.tip}</div>
                              <DrillInstructions drill={d} accentColor={accentColor}/>
                            </div>
                            <button disabled={done} onClick={()=>{
                              if(done)return;
                              if(!drillAlreadyGaveXP(k)){mut(prev=>{const nd={...(prev.drillXpDates||{})};nd[drillXpKey(k)]=true;return{...prev,xp:(prev.xp||0)+10,drillXpDates:nd};});spawnXP(10);}
                              const newDone={...drillsDone,[k]:true};
                              setDrillsDone(newDone);
                              // Check if all splits in this gym phase are done
                              const allDoneNow=["push","pull","legs"].every(sp=>GYM_SPLITS[gymPhase][sp].drills.every(dr=>newDone[`gym-${gymPhase}-${sp}-${dr.name}`]));
                              if(allDoneNow&&!(raw.gymPhasesClaimed||[]).includes(gymBadgeKey)){
                                mut(prev=>({...prev,xp:(prev.xp||0)+100,gymPhasesClaimed:[...(prev.gymPhasesClaimed||[]),gymBadgeKey]}));
                                spawnXP(100);
                                setTimeout(()=>triggerM(
                                  `GYM PHASE DONE 🏋️`,
                                  `${phase.phase} complete. +100 XP. ${gymPhase<2?"Move to the next phase when ready.":"All gym phases complete. Your strength base is built."}`
                                ),300);
                              }
                            }} style={{background:done?C.green:C.dim,border:`1px solid ${done?C.green:C.border}`,color:done?"#000":"#B8B8D0",borderRadius:5,padding:"7px 10px",fontFamily:"'DM Mono',monospace",fontSize:9,transition:"all .15s",flexShrink:0,cursor:done?"default":"pointer"}}>
                              {done?"✓ DONE":"DONE"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {/* Phase completion banner */}
                    {allSplitsDone&&(
                      <div className="pop" style={{background:"#0A130D",border:`1px solid ${C.green}`,borderRadius:8,padding:"14px 16px",marginTop:6,textAlign:"center"}}>
                        <div style={{fontSize:26,marginBottom:5}}>🏋️</div>
                        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.green,letterSpacing:".06em",marginBottom:4}}>
                          {["FOUNDATION GYM COMPLETE","OVERLOAD GYM COMPLETE","PEAK GYM COMPLETE"][gymPhase]}
                        </div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.6,marginBottom:gymPhase<2?8:0}}>
                          {["Strength base is set. Move to Overload when ready.","Heavy phase done. Peak is explosive — stay powerful.","All gym phases complete. Your vertical has a real engine now."][gymPhase]}
                        </div>
                        {gymPhase<GYM_SPLITS.length-1&&(
                          <button onClick={()=>setGymPhase(gymPhase+1)} style={{background:C.purple,color:"#FFF",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:".08em",padding:"9px 20px",borderRadius:5}}>
                            START {["OVERLOAD GYM →","PEAK GYM →"][gymPhase]}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── RECOVERY TAB ── */}
          {proTab==="recovery"&&(()=>{
            const recKey = `rec-${today()}`;
            const recDrills = RECOVERY_DAYS[0].drills;
            const doneCount = recDrills.filter(d=>!!drillsDone[`rec-${today()}-${d.name}`]).length;
            const allRecDone = doneCount === recDrills.length;
            const recXpClaimed = !!(raw.recXpDates||{})[today()];
            return (
              <div>
                {/* Why it matters */}
                <div style={{background:`${C.cyan}0C`,border:`1px solid ${C.cyan}33`,borderRadius:8,padding:"11px 13px",marginBottom:12}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.cyan,letterSpacing:".14em",marginBottom:4}}>WHY RECOVERY MATTERS</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted,lineHeight:1.6}}>Tendons adapt slower than muscles. One recovery day per week prevents injury and lets your nervous system fully reset — which actually increases your vertical.</div>
                </div>

                {/* Header card */}
                <div style={{background:C.card,border:`1px solid ${C.cyan}33`,borderRadius:8,padding:"11px 13px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.cyan,letterSpacing:".05em",marginBottom:2}}>{RECOVERY_DAYS[0].title}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted}}>{RECOVERY_DAYS[0].est} · resets daily · +40 XP on completion</div>
                  </div>
                  <div style={{textAlign:"center",background:C.dim,borderRadius:6,padding:"6px 10px",minWidth:44}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:allRecDone?C.green:C.cyan,lineHeight:1}}>{doneCount}/{recDrills.length}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,marginTop:1}}>DONE</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{height:3,background:C.dim,borderRadius:2,marginBottom:10}}>
                  <div style={{height:3,width:`${(doneCount/recDrills.length)*100}%`,background:allRecDone?C.green:C.cyan,borderRadius:2,transition:"width .4s"}}/>
                </div>

                {/* Drills */}
                {recDrills.map((d,i)=>{
                  const k=`rec-${today()}-${d.name}`, done=!!drillsDone[k];
                  return (
                    <div key={i} className={done?"doneglow":""} style={{background:done?"#0A130D":C.card,border:`1px solid ${done?"#2A5A32":C.border}`,borderRadius:7,padding:"11px 12px",marginBottom:6,transition:"all .25s"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                            {done&&<span style={{fontSize:13,color:C.green}}>✓</span>}
                            <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:18,color:done?C.green:"#F0F0F0"}}>{d.name}</div>
                          </div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.muted}}>{d.sets} × {d.reps}</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.cyan,marginTop:3,opacity:.9}}>💡 {d.tip}</div>
                          <DrillInstructions drill={d} accentColor={accentColor}/>
                        </div>
                        <button disabled={done} onClick={()=>{
                          if(done)return;
                          setDrillsDone(s=>({...s,[k]:true}));
                        }} style={{background:done?C.green:C.dim,border:`1px solid ${done?C.green:C.border}`,color:done?"#000":"#555",borderRadius:5,padding:"7px 10px",fontFamily:"'DM Mono',monospace",fontSize:12,transition:"all .15s",flexShrink:0,cursor:done?"default":"pointer"}}>
                          {done?"✓ DONE":"DONE"}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Completion banner + XP claim */}
                {allRecDone&&(
                  <div className="pop" style={{background:"#08120D",border:`1px solid ${C.green}`,borderRadius:8,padding:"14px 16px",marginTop:6,textAlign:"center"}}>
                    <div style={{fontSize:26,marginBottom:5}}>❄️</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.green,letterSpacing:".06em",marginBottom:6}}>RECOVERY COMPLETE</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.muted,lineHeight:1.6,marginBottom:10}}>Your tendons and nervous system thank you. Come back tomorrow for your next workout.</div>
                    {!recXpClaimed
                      ? <button onClick={()=>{
                          mut(prev=>({...prev,xp:(prev.xp||0)+40,recXpDates:{...(prev.recXpDates||{}),[today()]:true}}));
                          spawnXP(40); showT("❄️ Recovery complete! +40 XP");
                        }} style={{background:C.cyan,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:".1em",padding:"11px 24px",borderRadius:5}}>CLAIM +40 XP</button>
                      : <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.green}}>✓ XP claimed — resets tomorrow</div>
                    }
                  </div>
                )}

                {/* Sleep & recovery tips */}
                <div style={{background:C.dim,borderRadius:7,padding:"10px 12px",marginTop:12}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".12em",marginBottom:6}}>RECOVERY REMINDERS</div>
                  {["8+ hours of sleep — vertical gains happen at night, not in the gym.","Drink 2–3L of water daily, especially on training days.","Protein: 0.7–1g per lb of bodyweight. Muscles repair while you sleep.","No intense jump training 2 days in a row during peak phase."].map((tip,i)=>(
                    <div key={i} style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.6,paddingLeft:10,position:"relative",marginBottom:2}}>
                      <span style={{position:"absolute",left:0,color:C.cyan}}>·</span>{tip}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ── WEEKLY CHALLENGES TAB ── */}
          {proTab==="challenges"&&(
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".14em",marginBottom:4}}>WEEK {getWeekNumber()} CHALLENGES</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,marginBottom:12}}>3 goals every week. Resets Monday.</div>
              {weeklyChallenges.map((ch)=>{
                const completed = ch.check(raw);
                const claimed   = claimedWC.includes(ch.id);
                // Real progress calculation per challenge type
                const progress = (() => {
                  if (claimed || completed) return 100;
                  const ws = weekStart();
                  if (ch.id.includes("workouts4"))  { const n=Math.min((raw.activeDays||[]).filter(d=>new Date(d)>=ws).length,4); return Math.round((n/4)*100); }
                  if (ch.id.includes("workouts5"))  { const n=Math.min((raw.activeDays||[]).filter(d=>new Date(d)>=ws).length,5); return Math.round((n/5)*100); }
                  if (ch.id.includes("vert_log"))   { const n=Math.min((raw.vertLogs||[]).filter(v=>new Date(v.date)>=ws).length,3); return Math.round((n/3)*100); }
                  if (ch.id.includes("sprints3"))   { const n=Math.min((raw.sprints||[]).filter(s=>new Date(s.date)>=ws).length,3); return Math.round((n/3)*100); }
                  if (ch.id.includes("streak5"))    { return Math.min(Math.round((calcStreak(raw.activeDays||[])/5)*100),99); }
                  if (ch.id.includes("challenge7")) { const n=Math.min((raw.chDates||[]).filter(c=>new Date(c)>=ws).length,7); return Math.round((n/7)*100); }
                  if (ch.id.includes("active6"))    { const n=Math.min((raw.activeDays||[]).filter(d=>new Date(d)>=ws).length,6); return Math.round((n/6)*100); }
                  if (ch.id.includes("noskim"))     { const n=Math.min((raw.fullWorkouts||[]).filter(w=>new Date(w)>=ws).length,3); return Math.round((n/3)*100); }
                  if (ch.id.includes("vert_gain"))  { const vs=(raw.vertLogs||[]).filter(v=>new Date(v.date)>=ws); if(vs.length<2)return 0; const maxPrev=vs.slice(0,-1).reduce((m,v)=>Math.max(m,v.v),0); return vs[vs.length-1].v>maxPrev?100:0; }
                  return 0;
                })();
                return (
                  <div key={ch.id} style={{background:claimed?"#0A130D":C.card,border:`1px solid ${claimed?C.green+"44":C.border}`,borderRadius:8,padding:"12px 13px",marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <span style={{fontSize:20}}>{ch.icon}</span>
                        <div>
                          <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:700,fontSize:18,color:claimed?C.green:"#F0F0F0"}}>{ch.label}</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>+{ch.xp} XP on completion</div>
                        </div>
                      </div>
                      {!claimed && completed && (
                        <button onClick={()=>{
                          mut(prev=>({...prev,[weekKey]:[...(prev[weekKey]||[]),ch.id],xp:(prev.xp||0)+ch.xp}));
                          spawnXP(ch.xp); showT(`✓ Challenge complete! +${ch.xp} XP`);
                        }} style={{background:C.green,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:".08em",padding:"7px 13px",borderRadius:4,flexShrink:0}}>CLAIM</button>
                      )}
                      {claimed && <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:C.green,flexShrink:0}}>✓ CLAIMED</span>}
                      {!claimed && !completed && <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,flexShrink:0}}>{progress}%</span>}
                    </div>
                    {/* Real progress bar */}
                    <div style={{height:3,background:C.dim,borderRadius:2}}>
                      <div style={{height:3,width:`${progress}%`,background:claimed||completed?C.green:theme.accent,borderRadius:2,transition:"width .5s"}}/>
                    </div>
                  </div>
                );
              })}
              {/* Streak Shield */}
              <div style={{marginTop:16}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.muted,letterSpacing:".14em",marginBottom:8}}>STREAK SHIELD</div>
                <div style={{background:shieldAvailable?`${theme.accent}12`:shieldUsed?"#0A0A0E":C.card,border:`1px solid ${shieldAvailable?theme.accent+"44":shieldUsed?C.border:C.border}`,borderRadius:8,padding:"12px 13px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:".05em",marginBottom:3}}>
                        {shieldAvailable?"🛡️ SHIELD AVAILABLE":shieldUsed?"🛡️ SHIELD USED THIS WEEK":"🛡️ STREAK SHIELD"}
                      </div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.muted,lineHeight:1.5}}>
                        {shieldAvailable?"Missing a day won't break your streak. Resets each Monday.":shieldUsed?"Your shield was used this week. Resets Monday.":"Upgrade to Pro to unlock Streak Shield."}
                      </div>
                    </div>
                    {shieldAvailable && D.streak > 0 && (
                      <button onClick={()=>{
                        mut(prev=>({...prev,shieldUsedWeek:getWeekNumber(),activeDays:[...(prev.activeDays||[]),today()]}));
                        showT("🛡️ Shield used — streak protected!");
                      }} style={{background:theme.accent,color:"#000",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:".08em",padding:"8px 12px",borderRadius:4,flexShrink:0,marginLeft:10}}>USE</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── WEEKLY REPORT TAB ── */}
          {proTab==="report"&&(
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".14em",marginBottom:12}}>GENERATED WEEKLY — UPDATES EVERY SUNDAY</div>
              {/* Hero stat */}
              <div style={{background:`linear-gradient(135deg,#0D0D16,${theme.accent}12)`,border:`1px solid ${theme.accent}33`,borderRadius:10,padding:"16px 15px",marginBottom:12,textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:theme.accent,letterSpacing:".16em",marginBottom:6}}>WEEK {getWeekNumber()} SUMMARY</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                  {[
                    {l:"SESSIONS",  v:`${weeklyReport.wkSessions}`, c:weeklyReport.wkSessions>=4?C.green:weeklyReport.wkSessions>=2?C.gold:C.red},
                    {l:"VERT GAIN", v:weeklyReport.wkGain!=null?`${weeklyReport.wkGain>0?"+":""}${weeklyReport.wkGain}"`:"—", c:weeklyReport.wkGain&&weeklyReport.wkGain>0?C.green:C.muted},
                    {l:"CONSISTENCY",v:weeklyReport.consistency, c:weeklyReport.consistency==="Elite"?C.gold:weeklyReport.consistency==="Strong"?C.green:weeklyReport.consistency==="Decent"?theme.accent:C.red},
                  ].map(s=>(
                    <div key={s.l} style={{background:C.dim,borderRadius:6,padding:"9px 0"}}>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:s.c,lineHeight:1}}>{s.v}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,marginTop:2,letterSpacing:".1em"}}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",background:C.dim,borderRadius:6,padding:"9px 12px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted}}>Est. dunk timeline</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:C.gold}}>~{snap.wkEst} weeks</div>
                </div>
              </div>
              {/* Coach assessment */}
              <div style={{background:`${theme.accent}0C`,border:`1px solid ${theme.accent}28`,borderRadius:8,padding:"12px 13px",marginBottom:12}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:theme.accent,letterSpacing:".12em",marginBottom:4}}>🤖 COACH ASSESSMENT</div>
                <div style={{fontFamily:'"Barlow Condensed",sans-serif',fontWeight:600,fontSize:18,color:"#EEE",lineHeight:1.5}}>{weeklyReport.assessment}</div>
              </div>
              {/* Next week focus */}
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 13px"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,letterSpacing:".12em",marginBottom:8}}>NEXT WEEK — FOCUS AREAS</div>
                {[
                  weeklyReport.wkSessions<4&&"Increase to 4+ sessions — consistency is the bottleneck",
                  !lastVert&&"Log your vertical — you need data to measure progress",
                  weeklyReport.wkGain===null&&"Log vertical twice this week to see a weekly gain",
                  D.streak<7&&"Build toward a 7-day streak for the bonus XP",
                  gap>10&&"Focus on Jump Training days — vert gains need plyometric work",
                ].filter(Boolean).slice(0,3).map((f,i)=>(
                  <div key={i} style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,lineHeight:1.6,paddingLeft:12,position:"relative",marginBottom:4}}>
                    <span style={{position:"absolute",left:0,color:theme.accent}}>›</span>{f}
                  </div>
                ))}
                {[weeklyReport.wkSessions>=4,!!lastVert,weeklyReport.wkGain!==null].every(Boolean)&&(
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.green}}>✓ All key metrics on track. Maintain the pace.</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const SettingsView = (
    <div className="fade">
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:".06em",marginBottom:4}}>SETTINGS</div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.muted,marginBottom:20}}>Customize your Dunk Lab experience</div>
      
      {/* Theme Section */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 16px",marginBottom:12}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.muted,letterSpacing:".12em",marginBottom:12}}>THEME</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.label,marginBottom:8}}>Accent Color</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {Object.entries(ACCENT_COLORS).map(([key,color]) => (
            <button
              key={key}
              onClick={()=>setAccentColor(key)}
              style={{
                background:accentColor===key ? `${color}18` : C.dim,
                border:`1px solid ${accentColor===key ? color : C.border}`,
                borderRadius:6,
                padding:"12px",
                display:"flex",
                alignItems:"center",
                gap:10,
                cursor:"pointer",
                transition:"all .15s"
              }}
            >
              <div style={{width:24,height:24,borderRadius:"50%",background:color,flexShrink:0}}/>
              <div style={{textAlign:"left"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:accentColor===key ? color : C.muted,letterSpacing:".04em"}}>{THEME_NAMES[key]}</div>
                {accentColor===key && (
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:color,marginTop:2}}>Selected</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Info Section */}
      <div style={{background:`${C.dim}`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.label,lineHeight:1.6}}>
          Theme preference is saved automatically. Light mode coming soon.
        </div>
      </div>
    </div>
  );

  const VIEWS = {home:HomeView, train:TrainView, track:TrackView, rank:RankView, program:ProgramView, settings:SettingsView};
  const NAV   = [{id:"home",icon:"⬡",label:"HOME"},{id:"train",icon:"▣",label:"TRAIN"},{id:"track",icon:"◉",label:"TRACK"},{id:"rank",icon:"⭐",label:"RANK"},{id:"program",icon:"🔥",label:"PROGRAM"},{id:"settings",icon:"⚙️",label:"SETTINGS"}];

  function resetAllData() {
    try {
      ["dunklab-v10","dunklab-v9","dunklab-v8","dunklab-v7","dunklab-v6","dunklab-v5",
       "dl_drills_v10","dl_drills_v9","dl_drills_v8"].forEach(k => localStorage.removeItem(k));
    } catch {}
    window.location.reload();
  }

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:"#F0F0F0",paddingBottom:62}}>
      {/* Top bar */}
      <div style={{borderBottom:`1px solid ${C.border}`,padding:"0 13px",height:46,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:C.bg,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:4,height:20,background:theme.accent,borderRadius:2}}/>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:".14em"}}>DUNK LAB</span>
          {D.isPro&&<span style={{background:theme.accent,color:"#000",fontFamily:"'DM Mono',monospace",fontSize:8,fontWeight:500,padding:"2px 5px",borderRadius:2,letterSpacing:".08em"}}>PRO</span>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{display:"flex",alignItems:"center",gap:3,background:`${rank.color}18`,border:`1px solid ${rank.color}40`,borderRadius:20,padding:"2px 8px"}}>
            <span style={{fontSize:11}}>{rank.icon}</span>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,color:rank.color,letterSpacing:".06em"}}>{rank.name}</span>
          </div>
          {D.streak>0&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:theme.accent}}>🔥{D.streak}</span>}
          <button onClick={resetAllData} style={{background:"none",border:`1px solid #2A2A3A`,color:"#3A3A52",fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:".06em",padding:"3px 7px",borderRadius:4}}>RESET</button>
        </div>
      </div>
      {/* Toast */}
      {toast&&<div className="fade" style={{position:"fixed",top:54,left:"50%",transform:"translateX(-50%)",background:"#12121E",border:`1px solid ${theme.accent}`,color:"#F0F0F0",fontFamily:"'DM Mono',monospace",fontSize:10,padding:"8px 15px",borderRadius:4,zIndex:300,whiteSpace:"nowrap",letterSpacing:".06em"}}>{toast}</div>}
      {/* Content — key forces clean fade-in on every tab switch */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"15px 13px"}}>
        <div key={view} className="fade">{VIEWS[view]}</div>
      </div>
      {/* Bottom nav */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0A12",borderTop:`1px solid ${C.border}`,display:"grid",gridTemplateColumns:`repeat(${NAV.length},1fr)`,height:56,zIndex:50}}>
        {NAV.map(({id,icon,label})=>(
          <button key={id} onClick={()=>setView(id)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,color:view===id?theme.accent:"#B8B8D0",transition:"color .15s"}}>
            <span style={{fontSize:14,lineHeight:1}}>{icon}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".06em"}}>{label}</span>
          </button>
        ))}
      </div>
      {showPro&&<ProModal onClose={()=>setShowPro(false)} onUpgrade={upgrade} gap={gap} wkSess={wkSess} accentColor={accentColor}/>}
      {milestone&&<Milestone msg={milestone.msg} sub={milestone.sub} onClose={()=>setMilestone(null)} accentColor={accentColor}/>}
    </div>
  );
}
