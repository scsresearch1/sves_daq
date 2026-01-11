import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function iso(ts: number): string { return new Date(ts).toISOString(); }

interface Point {
  ts: number;
  value: any;
  quality?: string;
  eventTag?: string;
}

function mkPoints({ startTs, stepMs, values, quality = "OK", eventTags = {} }: { 
  startTs: number; 
  stepMs: number; 
  values: any[]; 
  quality?: string; 
  eventTags?: { [key: number]: string } 
}): Point[] {
  return values.map((v, i) => {
    const ts = startTs + i * stepMs;
    const p: Point = { ts, value: v, quality };
    if (eventTags[i]) p.eventTag = eventTags[i];
    return p;
  });
}

// Generate realistic time-series data with trends and noise
function generateTimeSeries(baseValue: number, length: number, trend: number = 0, noise: number = 0.05, min?: number, max?: number): number[] {
  const values: number[] = [];
  let current = baseValue;
  for (let i = 0; i < length; i++) {
    current += trend + (Math.random() - 0.5) * noise * baseValue;
    if (min !== undefined) current = Math.max(current, min);
    if (max !== undefined) current = Math.min(current, max);
    values.push(Math.round(current * 100) / 100);
  }
  return values;
}

// Generate sinusoidal pattern with noise
function generateSinusoidal(baseValue: number, amplitude: number, length: number, frequency: number = 1, noise: number = 0.02): number[] {
  const values: number[] = [];
  for (let i = 0; i < length; i++) {
    const value = baseValue + amplitude * Math.sin(2 * Math.PI * frequency * i / length) + (Math.random() - 0.5) * noise * baseValue;
    values.push(Math.round(value * 100) / 100);
  }
  return values;
}

async function upsertDoc(db: admin.firestore.Firestore, col: string, id: string, data: any) {
  await db.collection(col).doc(id).set(data, { merge: true });
}

async function seed() {
  try {
    const credPath = mustEnv("GOOGLE_APPLICATION_CREDENTIALS");
    const projectId = mustEnv("FIREBASE_PROJECT_ID");

    // Resolve path: if absolute, use as-is; if relative, resolve from backend root
    const backendRoot = path.resolve(__dirname, "..");
    const absoluteCredPath = path.isAbsolute(credPath) 
      ? credPath 
      : path.resolve(backendRoot, credPath);

    if (!fs.existsSync(absoluteCredPath)) {
      throw new Error(`Service account file not found: ${absoluteCredPath}`);
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(fs.readFileSync(absoluteCredPath, "utf8"))),
        projectId
      });
    }

    const db = admin.firestore();

    console.log("🌱 Starting comprehensive data seed...\n");

    // ========== PROGRAMS (3 programs) ==========
    console.log("📋 Seeding programs...");
    const programs = [
      {
        id: "baja_2026",
        data: {
          programName: "Baja SAE 2026",
          vehicleType: "OffRoad",
          massKg: 265,
          driveType: "RWD",
          createdAt: iso(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
          status: "Active"
        }
      },
      {
        id: "formula_2025",
        data: {
          programName: "Formula SAE 2025",
          vehicleType: "Racing",
          massKg: 185,
          driveType: "RWD",
          createdAt: iso(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
          status: "Active"
        }
      },
      {
        id: "ev_prototype_2026",
        data: {
          programName: "EV Prototype 2026",
          vehicleType: "Electric",
          massKg: 320,
          driveType: "AWD",
          createdAt: iso(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
          status: "Active"
        }
      }
    ];

    for (const p of programs) await upsertDoc(db, "programs", p.id, p.data);
    console.log(`✅ Created ${programs.length} programs\n`);

    // ========== VEHICLES (2-3 per program) ==========
    console.log("🚗 Seeding vehicles...");
    const vehicles = [
      { id: "baja_001", programId: "baja_2026", variant: "EnduranceSpec", suspensionType: "DoubleWishbone", brakeType: "HydraulicDisc", powertrain: "ICE", environment: "Mixed" },
      { id: "baja_002", programId: "baja_2026", variant: "AccelerationSpec", suspensionType: "DoubleWishbone", brakeType: "HydraulicDisc", powertrain: "ICE", environment: "Mixed" },
      { id: "formula_001", programId: "formula_2025", variant: "AeroPackage", suspensionType: "Pushrod", brakeType: "CarbonCeramic", powertrain: "ICE", environment: "Track" },
      { id: "formula_002", programId: "formula_2025", variant: "BasePackage", suspensionType: "Pushrod", brakeType: "CarbonCeramic", powertrain: "ICE", environment: "Track" },
      { id: "ev_001", programId: "ev_prototype_2026", variant: "Performance", suspensionType: "MacPherson", brakeType: "Regenerative", powertrain: "Electric", environment: "Mixed" },
      { id: "ev_002", programId: "ev_prototype_2026", variant: "Efficiency", suspensionType: "MacPherson", brakeType: "Regenerative", powertrain: "Electric", environment: "Urban" }
    ];

    for (const v of vehicles) await upsertDoc(db, "vehicles", v.id, v);
    console.log(`✅ Created ${vehicles.length} vehicles\n`);

    // ========== SENSORS (expanded realistic set) ==========
    console.log("📡 Seeding sensors...");
    const sensors = [
      // Chassis & Suspension
      { id: "strain_FLCA_L", type: "StrainGauge", location: "FrontLowerControlArm_Left", model: "HBK_LY11", signalType: "Bridge", unit: "microstrain" },
      { id: "strain_FLCA_R", type: "StrainGauge", location: "FrontLowerControlArm_Right", model: "Vishay_CEA", signalType: "Bridge", unit: "microstrain" },
      { id: "strain_RLCA_L", type: "StrainGauge", location: "RearLowerControlArm_Left", model: "HBK_LY11", signalType: "Bridge", unit: "microstrain" },
      { id: "strain_RLCA_R", type: "StrainGauge", location: "RearLowerControlArm_Right", model: "Vishay_CEA", signalType: "Bridge", unit: "microstrain" },
      { id: "force_strut_top_R", type: "ForceSensor", location: "StrutTopMount_Right", model: "Kistler_9345B", signalType: "Piezo", unit: "kN" },
      { id: "force_strut_top_L", type: "ForceSensor", location: "StrutTopMount_Left", model: "Kistler_9345B", signalType: "Piezo", unit: "kN" },
      { id: "wheel_travel_FL", type: "Displacement", location: "FrontLeft_Wheel", model: "LVDT", signalType: "Analog", unit: "mm" },
      { id: "wheel_travel_FR", type: "Displacement", location: "FrontRight_Wheel", model: "LVDT", signalType: "Analog", unit: "mm" },
      
      // Brake & Safety
      { id: "brake_pressure", type: "Pressure", location: "BrakeHydraulicLine", model: "Kistler_4067", signalType: "Analog", unit: "bar" },
      { id: "brake_temp_FL", type: "Temperature", location: "BrakeDisc_FrontLeft", model: "Thermocouple", signalType: "TC", unit: "C" },
      { id: "brake_temp_FR", type: "Temperature", location: "BrakeDisc_FrontRight", model: "Thermocouple", signalType: "TC", unit: "C" },
      { id: "wheel_speed_FL", type: "WheelSpeed", location: "FrontLeft", model: "OEM_ABS_Sensor", signalType: "Digital", unit: "kmph" },
      { id: "wheel_speed_FR", type: "WheelSpeed", location: "FrontRight", model: "OEM_ABS_Sensor", signalType: "Digital", unit: "kmph" },
      { id: "wheel_speed_RL", type: "WheelSpeed", location: "RearLeft", model: "OEM_ABS_Sensor", signalType: "Digital", unit: "kmph" },
      { id: "wheel_speed_RR", type: "WheelSpeed", location: "RearRight", model: "OEM_ABS_Sensor", signalType: "Digital", unit: "kmph" },
      { id: "vehicle_speed", type: "Speed", location: "Vehicle", model: "Derived_CAN", signalType: "CAN", unit: "kmph" },
      { id: "decel_g", type: "Accelerometer", location: "CG_Longitudinal", model: "PCB_356A", signalType: "IEPE", unit: "g" },
      { id: "abs_active", type: "Flag", location: "ABS", model: "Derived_ECU", signalType: "Digital", unit: "bool" },
      
      // NVH & Acoustics
      { id: "mic_spl", type: "Microphone", location: "WheelWell", model: "GRAS_46AE", signalType: "ICP", unit: "dBA" },
      { id: "mic_cabin", type: "Microphone", location: "Cabin_Center", model: "GRAS_46AE", signalType: "ICP", unit: "dBA" },
      { id: "noise_dom_freq", type: "Derived", location: "NVH", model: "FFT_STFT", signalType: "Computed", unit: "Hz" },
      { id: "rpm", type: "RPM", location: "Crank/Encoder", model: "Encoder", signalType: "Digital", unit: "rpm" },
      { id: "order_2p5_amp", type: "Order", location: "NVH", model: "OrderTracking", signalType: "Computed", unit: "arb" },
      { id: "order_1p0_amp", type: "Order", location: "NVH", model: "OrderTracking", signalType: "Computed", unit: "arb" },
      
      // Ride & Comfort
      { id: "seat_accel_z", type: "Accelerometer", location: "SeatRail_Z", model: "HBK_4524B", signalType: "IEPE", unit: "mps2" },
      { id: "seat_accel_x", type: "Accelerometer", location: "SeatRail_X", model: "HBK_4524B", signalType: "IEPE", unit: "mps2" },
      { id: "seat_accel_y", type: "Accelerometer", location: "SeatRail_Y", model: "HBK_4524B", signalType: "IEPE", unit: "mps2" },
      { id: "steer_accel_x", type: "Accelerometer", location: "Steering_X", model: "PCB_356A", signalType: "IEPE", unit: "mps2" },
      { id: "floor_accel_z", type: "Accelerometer", location: "Floor_Z", model: "PCB_356A", signalType: "IEPE", unit: "mps2" },
      
      // Powertrain & Electrical
      { id: "dc_voltage", type: "Voltage", location: "DCBus", model: "Yokogawa_PowerAnalyzer", signalType: "Analog", unit: "V" },
      { id: "dc_current", type: "Current", location: "DCBus", model: "Yokogawa_PowerAnalyzer", signalType: "Analog", unit: "A" },
      { id: "dc_power", type: "Power", location: "DCBus", model: "Computed_VI", signalType: "Computed", unit: "W" },
      { id: "ac_voltage", type: "Voltage", location: "ACSide", model: "Yokogawa_PowerAnalyzer", signalType: "Analog", unit: "V" },
      { id: "ac_current", type: "Current", location: "ACSide", model: "Yokogawa_PowerAnalyzer", signalType: "Analog", unit: "A" },
      { id: "thd_pct", type: "PowerQuality", location: "ACSide", model: "Computed_THD", signalType: "Computed", unit: "pct" },
      
      // Thermal & Environment
      { id: "strut_temp", type: "Temperature", location: "DamperBody", model: "TypeK_Thermocouple", signalType: "TC", unit: "C" },
      { id: "ambient_temp", type: "Temperature", location: "Ambient", model: "RTD_PT100", signalType: "RTD", unit: "C" },
      { id: "engine_temp", type: "Temperature", location: "EngineBlock", model: "RTD_PT100", signalType: "RTD", unit: "C" },
      { id: "battery_temp", type: "Temperature", location: "BatteryPack", model: "RTD_PT100", signalType: "RTD", unit: "C" }
    ];

    for (const s of sensors) await upsertDoc(db, "sensors", s.id, s);
    console.log(`✅ Created ${sensors.length} sensors\n`);

    // ========== TESTS (30+ test runs across programs) ==========
    console.log("🧪 Seeding tests...");
    const now = Date.now();
    const baseTs = now - 30 * 24 * 60 * 60 * 1000; // 30 days ago
    const tests: Array<{ id: string; data: any }> = [];
    const operators = ["TestEngineer_01", "TestEngineer_02", "BrakeEngineer_01", "NVHEngineer_01", "EE_01", "Powertrain_01", "Reliability_01", "CAE_01"];
    const tracks = ["RoughLoop", "StraightLine", "Dyno/Track", "Lab", "EngineDyno", "Climatic", "HighSpeed", "Maneuverability"];
    const statuses = ["Completed", "Completed", "Completed", "InProgress", "Scheduled"]; // Weighted towards completed

    // Baja 2026 tests (12 tests)
    for (let i = 1; i <= 12; i++) {
      const testTypes = [
        "Endurance + RLDA", "Brake Performance", "NVH + Brake Noise", "Ride Comfort",
        "Durability", "Thermal Cycling", "Split-µ Braking", "ABS Evaluation"
      ];
      const standards = [
        ["ISO2631", "ISO8608"], ["FMVSS135", "ECE_R13"], ["VDA303"], ["ISO2631"],
        ["ISO8608"], ["ISO16750"], ["FMVSS135"], ["ECE_R13"]
      ];
      tests.push({
        id: `baja_endurance_${String(i).padStart(2, '0')}`,
        data: {
          vehicleId: i % 2 === 0 ? "baja_002" : "baja_001",
          programId: "baja_2026",
          testType: testTypes[(i - 1) % testTypes.length],
          track: tracks[(i - 1) % tracks.length],
          standards: standards[(i - 1) % standards.length],
          startTime: iso(baseTs + i * 2 * 60 * 60 * 1000), // 2 hours apart
          operator: operators[i % operators.length],
          status: statuses[i % statuses.length],
          duration: 1800 + Math.random() * 3600 // 30-90 minutes
        }
      });
    }

    // Formula 2025 tests (10 tests)
    for (let i = 1; i <= 10; i++) {
      const testTypes = [
        "Aerodynamic Testing", "Brake Performance", "Handling", "Powertrain",
        "Endurance", "Thermal Management", "NVH", "Compliance"
      ];
      tests.push({
        id: `formula_test_${String(i).padStart(2, '0')}`,
        data: {
          vehicleId: i % 2 === 0 ? "formula_002" : "formula_001",
          programId: "formula_2025",
          testType: testTypes[(i - 1) % testTypes.length],
          track: tracks[(i + 5) % tracks.length],
          standards: ["SAE_J211", "ISO10844"],
          startTime: iso(baseTs + (i + 12) * 2 * 60 * 60 * 1000),
          operator: operators[(i + 2) % operators.length],
          status: statuses[i % statuses.length],
          duration: 1200 + Math.random() * 2400
        }
      });
    }

    // EV Prototype tests (10 tests)
    for (let i = 1; i <= 10; i++) {
      const testTypes = [
        "Range Testing", "Power Analysis", "Thermal Management", "Brake Regeneration",
        "NVH", "Comfort", "Environmental", "Durability"
      ];
      tests.push({
        id: `ev_test_${String(i).padStart(2, '0')}`,
        data: {
          vehicleId: i % 2 === 0 ? "ev_002" : "ev_001",
          programId: "ev_prototype_2026",
          testType: testTypes[(i - 1) % testTypes.length],
          track: tracks[(i + 3) % tracks.length],
          standards: ["ISO16750", "ISO2631"],
          startTime: iso(baseTs + (i + 22) * 2 * 60 * 60 * 1000),
          operator: operators[(i + 4) % operators.length],
          status: statuses[i % statuses.length],
          duration: 2400 + Math.random() * 3600
        }
      });
    }

    for (const t of tests) await upsertDoc(db, "tests", t.id, t.data);
    console.log(`✅ Created ${tests.length} tests\n`);

    // ========== STREAMS (comprehensive time-series data) ==========
    console.log("📊 Seeding streams (this may take a moment)...");
    const streams: any[] = [];

    // Generate streams for each test
    for (const test of tests) {
      const testStartTs = new Date(test.data.startTime).getTime();
      const duration = test.data.duration || 1800; // seconds
      const stepMs = 100; // 10 Hz sampling
      const numPoints = Math.floor((duration * 1000) / stepMs);
      
      // Select relevant sensors based on test type
      let relevantSensors: string[] = [];
      if (test.data.testType.includes("Endurance") || test.data.testType.includes("Durability")) {
        relevantSensors = ["strain_FLCA_L", "strain_FLCA_R", "force_strut_top_R", "strut_temp", "seat_accel_z", "wheel_travel_FL"];
      } else if (test.data.testType.includes("Brake")) {
        relevantSensors = ["vehicle_speed", "brake_pressure", "decel_g", "abs_active", "brake_temp_FL", "wheel_speed_FL"];
      } else if (test.data.testType.includes("NVH")) {
        relevantSensors = ["mic_spl", "noise_dom_freq", "rpm", "order_2p5_amp", "order_1p0_amp"];
      } else if (test.data.testType.includes("Ride") || test.data.testType.includes("Comfort")) {
        relevantSensors = ["seat_accel_z", "seat_accel_x", "seat_accel_y", "steer_accel_x", "floor_accel_z"];
      } else if (test.data.testType.includes("Power") || test.data.testType.includes("Electrical")) {
        relevantSensors = ["dc_voltage", "dc_current", "dc_power", "ac_voltage", "thd_pct"];
      } else if (test.data.testType.includes("Thermal") || test.data.testType.includes("Environmental")) {
        relevantSensors = ["ambient_temp", "strut_temp", "engine_temp", "battery_temp"];
      } else {
        // Default: mix of sensors
        relevantSensors = ["vehicle_speed", "rpm", "seat_accel_z", "ambient_temp"];
      }

      // Generate data for each sensor
      for (const sensorId of relevantSensors) {
        if (!sensors.find(s => s.id === sensorId)) continue;

        const sensor = sensors.find(s => s.id === sensorId)!;
        let values: number[] = [];
        const eventTags: { [key: number]: string } = {};

        // Generate realistic data based on sensor type
        if (sensor.type === "StrainGauge") {
          values = generateTimeSeries(500, numPoints, 0, 0.15, 0, 2500);
          // Add some high-strain events
          for (let i = 0; i < numPoints; i += Math.floor(numPoints / 5)) {
            if (Math.random() > 0.7) {
              values[i] = 1500 + Math.random() * 1000;
              eventTags[i] = "HighStrain";
            }
          }
        } else if (sensor.type === "ForceSensor") {
          values = generateTimeSeries(4.0, numPoints, 0, 0.1, 0, 20);
          for (let i = 0; i < numPoints; i += Math.floor(numPoints / 4)) {
            if (Math.random() > 0.6) {
              values[i] = 10 + Math.random() * 8;
              eventTags[i] = "HighForce";
            }
          }
        } else if (sensor.type === "Pressure" || sensor.id === "brake_pressure") {
          values = generateTimeSeries(0, numPoints, 0, 0.2, 0, 70);
          // Simulate brake applications
          for (let i = 0; i < numPoints; i += Math.floor(numPoints / 3)) {
            if (Math.random() > 0.5) {
              const brakeLength = Math.floor(numPoints / 20);
              for (let j = 0; j < brakeLength && i + j < numPoints; j++) {
                values[i + j] = 20 + (brakeLength - j) / brakeLength * 40;
              }
              eventTags[i] = "BrakeApplication";
            }
          }
        } else if (sensor.type === "Speed" || sensor.type === "WheelSpeed") {
          values = generateSinusoidal(50, 40, numPoints, 0.5, 0.1);
        } else if (sensor.type === "Accelerometer") {
          values = generateSinusoidal(0.5, 0.4, numPoints, 2, 0.15);
          // Add shock events
          for (let i = 0; i < numPoints; i += Math.floor(numPoints / 6)) {
            if (Math.random() > 0.7) {
              values[i] = 0.8 + Math.random() * 0.5;
              eventTags[i] = "Shock";
            }
          }
        } else if (sensor.type === "Microphone") {
          values = generateTimeSeries(70, numPoints, 0, 0.08, 50, 100);
          // Add squeal events
          for (let i = 0; i < numPoints; i += Math.floor(numPoints / 8)) {
            if (Math.random() > 0.75) {
              values[i] = 85 + Math.random() * 10;
              eventTags[i] = "Squeal";
            }
          }
        } else if (sensor.type === "Temperature") {
          const baseTemp = sensor.id.includes("ambient") ? 25 : (sensor.id.includes("brake") ? 100 : 90);
          values = generateTimeSeries(baseTemp, numPoints, 0.01, 0.05, -10, 150);
        } else if (sensor.type === "RPM") {
          values = generateSinusoidal(2500, 1500, numPoints, 1, 0.1);
        } else if (sensor.type === "Voltage" || sensor.type === "Current") {
          const base = sensor.type === "Voltage" ? 48 : 15;
          values = generateTimeSeries(base, numPoints, 0, 0.05);
        } else if (sensor.type === "Power") {
          values = generateTimeSeries(800, numPoints, 0, 0.1, 0, 1500);
        } else if (sensor.type === "Order") {
          values = generateSinusoidal(0.15, 0.12, numPoints, 1.5, 0.2);
        } else if (sensor.type === "Derived") {
          values = generateTimeSeries(1200, numPoints, 0, 0.1, 500, 3000);
        } else if (sensor.type === "Flag") {
          values = Array(numPoints).fill(0).map(() => Math.random() > 0.9 ? 1 : 0);
        } else {
          values = generateTimeSeries(100, numPoints, 0, 0.1);
        }

        // Limit to reasonable size for Firestore (max ~1000 points per stream, chunk if needed)
        const maxPointsPerChunk = 1000;
        if (values.length > maxPointsPerChunk) {
          const numChunks = Math.ceil(values.length / maxPointsPerChunk);
          for (let chunkIdx = 0; chunkIdx < numChunks; chunkIdx++) {
            const startIdx = chunkIdx * maxPointsPerChunk;
            const endIdx = Math.min(startIdx + maxPointsPerChunk, values.length);
            const chunkValues = values.slice(startIdx, endIdx);
            const chunkEventTags: { [key: number]: string } = {};
            Object.keys(eventTags).forEach(k => {
              const idx = parseInt(k);
              if (idx >= startIdx && idx < endIdx) {
                chunkEventTags[idx - startIdx] = eventTags[idx];
              }
            });
            const chunkPoints = mkPoints({
              startTs: testStartTs + startIdx * stepMs,
              stepMs,
              values: chunkValues,
              eventTags: chunkEventTags
            });
            streams.push({
              testId: test.id,
              sensorId,
              chunkId: `c${String(chunkIdx + 1).padStart(2, '0')}`,
              samplingHz: 10,
              points: chunkPoints
            });
          }
        } else {
          const points = mkPoints({
            startTs: testStartTs,
            stepMs,
            values,
            eventTags
          });
          streams.push({
            testId: test.id,
            sensorId,
            chunkId: "c01",
            samplingHz: 10,
            points
          });
        }
      }
    }

    // Batch write streams (Firestore batch limit is 500)
    console.log(`   Writing ${streams.length} stream chunks...`);
    const batchSize = 500;
    for (let i = 0; i < streams.length; i += batchSize) {
      const batch = db.batch();
      const chunk = streams.slice(i, Math.min(i + batchSize, streams.length));
      for (const st of chunk) {
        const points = st.points;
        const startTs = points[0].ts;
        const endTs = points[points.length - 1].ts;
        const docId = `${st.testId}_${st.sensorId}_${st.chunkId}`;
        batch.set(db.collection("streams").doc(docId), {
          testId: st.testId,
          sensorId: st.sensorId,
          chunkId: st.chunkId,
          samplingHz: st.samplingHz,
          startTs,
          endTs,
          points
        }, { merge: true });
      }
      await batch.commit();
      if ((i + batchSize) % 2000 === 0) {
        console.log(`   Processed ${Math.min(i + batchSize, streams.length)}/${streams.length} streams...`);
      }
    }
    console.log(`✅ Created ${streams.length} stream chunks\n`);

    // ========== EVENTS (50+ events) ==========
    console.log("⚡ Seeding events...");
    const events: any[] = [];
    let eventCounter = 1;

    for (const test of tests) {
      const testStartTs = new Date(test.data.startTime).getTime();
      const duration = test.data.duration || 1800;
      
      // Generate events based on test type
      if (test.data.testType.includes("Endurance") || test.data.testType.includes("Durability")) {
        const numEvents = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < numEvents; i++) {
          const eventTypes = ["Landing", "BottomOut", "Washboard", "RockCrawl", "GOut", "HighStrain"];
          const severities = ["High", "High", "Medium", "Medium", "Low", "Info"];
          events.push({
            id: `ev_${test.id}_${String(eventCounter++).padStart(3, '0')}`,
            testId: test.id,
            eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            ts: testStartTs + Math.random() * duration * 1000,
            relatedSensors: ["strain_FLCA_L", "force_strut_top_R", "seat_accel_z"]
          });
        }
      } else if (test.data.testType.includes("Brake")) {
        const numEvents = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numEvents; i++) {
          events.push({
            id: `ev_${test.id}_${String(eventCounter++).padStart(3, '0')}`,
            testId: test.id,
            eventType: Math.random() > 0.5 ? "BrakeStop" : "ABSActivation",
            severity: Math.random() > 0.7 ? "High" : "Medium",
            ts: testStartTs + Math.random() * duration * 1000,
            relatedSensors: ["vehicle_speed", "brake_pressure", "decel_g", "abs_active"]
          });
        }
      } else if (test.data.testType.includes("NVH")) {
        const numEvents = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numEvents; i++) {
          events.push({
            id: `ev_${test.id}_${String(eventCounter++).padStart(3, '0')}`,
            testId: test.id,
            eventType: "BrakeSqueal",
            severity: Math.random() > 0.6 ? "High" : "Medium",
            ts: testStartTs + Math.random() * duration * 1000,
            relatedSensors: ["mic_spl", "noise_dom_freq"]
          });
        }
      } else if (test.data.testType.includes("Thermal") || test.data.testType.includes("Environmental")) {
        events.push({
          id: `ev_${test.id}_${String(eventCounter++).padStart(3, '0')}`,
          testId: test.id,
          eventType: Math.random() > 0.5 ? "WinterSoak" : "DesertSoak",
          severity: "Info",
          ts: testStartTs + Math.random() * duration * 1000,
          relatedSensors: ["ambient_temp"]
        });
      }
    }

    for (const e of events) {
      await upsertDoc(db, "events", e.id, {
        testId: e.testId,
        eventType: e.eventType,
        severity: e.severity,
        timestamp: iso(e.ts),
        ts: e.ts,
        relatedSensors: e.relatedSensors
      });
    }
    console.log(`✅ Created ${events.length} events\n`);

    // ========== KPIs (comprehensive for all tests) ==========
    console.log("📈 Seeding KPIs...");
    const kpis: any[] = [];

    for (const test of tests) {
      const baseKpi = {
        testId: test.id,
        vehicleId: test.data.vehicleId,
        programId: test.data.programId
      };

      // Generate KPIs based on test type
      if (test.data.testType.includes("Endurance") || test.data.testType.includes("Durability")) {
        kpis.push({
          id: `${test.id}_suspension`,
          data: {
            ...baseKpi,
            domain: "suspension",
            peakStrainUtilizationPct: 60 + Math.random() * 30,
            leftRightAsymmetryPct: 5 + Math.random() * 15,
            bottomOutCount: Math.floor(Math.random() * 5),
            loadSharingArmVsStrut: 0.5 + Math.random() * 0.3
          }
        });
        kpis.push({
          id: `${test.id}_fatigue`,
          data: {
            ...baseKpi,
            domain: "fatigue",
            rainflowBins: [
              { rangeMPa: "60-90", cycles: 20000 + Math.random() * 10000, damage: 0.02 + Math.random() * 0.05 },
              { rangeMPa: "90-130", cycles: 5000 + Math.random() * 5000, damage: 0.08 + Math.random() * 0.1 },
              { rangeMPa: "130-190", cycles: 1000 + Math.random() * 1000, damage: 0.2 + Math.random() * 0.3 },
              { rangeMPa: ">190", cycles: 50 + Math.random() * 200, damage: 0.1 + Math.random() * 0.2 }
            ],
            minerDamageTotal: 0.3 + Math.random() * 0.6,
            remainingLifeHours: 20 + Math.random() * 80
          }
        });
        kpis.push({
          id: `${test.id}_ride`,
          data: {
            ...baseKpi,
            domain: "ride",
            iso2631_weightedRMS_ms2: 0.5 + Math.random() * 0.6,
            exposureHours: 1 + Math.random() * 4,
            comfortStatus: Math.random() > 0.7 ? "Warning" : "OK"
          }
        });
        kpis.push({
          id: `${test.id}_thermal`,
          data: {
            ...baseKpi,
            domain: "thermal",
            strutTempPeakC: 100 + Math.random() * 40,
            tempGradientCperMin: 5 + Math.random() * 10,
            heatSoakDetected: Math.random() > 0.5
          }
        });
      }

      if (test.data.testType.includes("Brake")) {
        kpis.push({
          id: `${test.id}_brakes`,
          data: {
            ...baseKpi,
            domain: "brakes",
            stoppingDistanceM: 30 + Math.random() * 10,
            mfdd: 0.7 + Math.random() * 0.3,
            absActivationRate: 0.2 + Math.random() * 0.4,
            fadeSlope: -0.05 - Math.random() * 0.15
          }
        });
      }

      if (test.data.testType.includes("NVH")) {
        kpis.push({
          id: `${test.id}_nvh`,
          data: {
            ...baseKpi,
            domain: "nvh",
            splMax_dBA: 75 + Math.random() * 20,
            laeq_dBA: 65 + Math.random() * 15,
            squealOccurrences: Math.floor(Math.random() * 5),
            dominantOrder: 1.5 + Math.random() * 2.5
          }
        });
      }

      if (test.data.testType.includes("Power") || test.data.testType.includes("Electrical")) {
        kpis.push({
          id: `${test.id}_electrical`,
          data: {
            ...baseKpi,
            domain: "electrical",
            avgEfficiencyPct: 85 + Math.random() * 10,
            peakPowerW: 800 + Math.random() * 500,
            energyPerKm_Wh: 15 + Math.random() * 10,
            thdPct: 2 + Math.random() * 3
          }
        });
      }

      if (test.data.testType.includes("Thermal") || test.data.testType.includes("Environmental")) {
        kpis.push({
          id: `${test.id}_environment`,
          data: {
            ...baseKpi,
            domain: "environment",
            winterMinC: -15 + Math.random() * 10,
            desertMaxC: 35 + Math.random() * 15,
            performanceDriftPct: 2 + Math.random() * 8,
            deratingFlag: Math.random() > 0.6
          }
        });
      }

      // Executive KPIs for major tests
      if (test.id.includes("endurance_01") || test.id.includes("test_01") || Math.random() > 0.7) {
        kpis.push({
          id: `${test.id}_executive`,
          data: {
            ...baseKpi,
            domain: "executive",
            safetyComplianceIndex: 0.75 + Math.random() * 0.2,
            durabilityMarginPct: 20 + Math.random() * 40,
            nvhComplianceScore: 0.7 + Math.random() * 0.25,
            rideComfortIndex: 0.65 + Math.random() * 0.3,
            energyEfficiencyIndex: 0.8 + Math.random() * 0.15,
            environmentalRobustnessScore: 0.7 + Math.random() * 0.25,
            warrantyRiskIndex: 0.1 + Math.random() * 0.3
          }
        });
      }
    }

    for (const k of kpis) await upsertDoc(db, "kpis", k.id, k.data);
    console.log(`✅ Created ${kpis.length} KPIs\n`);

    // ========== ML PREDICTIONS (one per major test) ==========
    console.log("🤖 Seeding ML predictions...");
    const mlPredictions: any[] = [];

    for (const test of tests) {
      if (test.data.testType.includes("Endurance") || test.data.testType.includes("Durability") || Math.random() > 0.6) {
        const testStartTime = new Date(test.data.startTime).getTime();
        mlPredictions.push({
          testId: test.id,
          data: {
            testId: test.id,
            vehicleId: test.data.vehicleId,
            programId: test.data.programId,
            remainingLifeHours: 20 + Math.random() * 80,
            failureRiskScore: 0.1 + Math.random() * 0.4,
            brakeFadeRisk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            fastenerLooseningRisk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
            rideDiscomfortProbability: 0.2 + Math.random() * 0.5,
            squealLikelihood: 0.1 + Math.random() * 0.3,
            recommendedActions: [
              "Monitor high-speed compression damping performance",
              "Review fastener torque specifications",
              "Consider thermal management improvements"
            ],
            timestamp: iso(testStartTime + (test.data.duration || 1800) * 1000) // Prediction after test completion
          }
        });
      }
    }

    for (const ml of mlPredictions) {
      await upsertDoc(db, "ml_predictions", ml.testId, ml.data);
    }
    console.log(`✅ Created ${mlPredictions.length} ML predictions\n`);

    // ========== TEST DATA COLLECTION (for Analytics & TestData pages) ==========
    console.log("📋 Seeding testData collection...");
    const testDataRecords: any[] = [];

    // Map domain names from test types
    const domainMap: { [key: string]: string } = {
      "Endurance": "Durability",
      "Durability": "Durability",
      "Brake": "Safety",
      "Safety": "Safety",
      "NVH": "NVH",
      "Ride": "Ride",
      "Comfort": "Ride",
      "Power": "Power",
      "Electrical": "Power",
      "Thermal": "Environmental",
      "Environmental": "Environmental",
      "Aerodynamic": "Safety",
      "Handling": "Safety",
      "Range": "Power"
    };

    for (const test of tests) {
      // Determine domain from test type
      let domain = "Safety";
      for (const [key, value] of Object.entries(domainMap)) {
        if (test.data.testType.includes(key)) {
          domain = value;
          break;
        }
      }

      // Get average KPI for this test
      const testKpis = kpis.filter(k => k.id.startsWith(test.id));
      let avgKpi = 85;
      if (testKpis.length > 0) {
        const kpiValues = testKpis.map(k => {
          const data = k.data;
          if (data.domain === "executive") {
            return (data.safetyComplianceIndex || 0) * 100;
          } else if (data.domain === "brakes") {
            return (data.mfdd || 0) * 10 + 70;
          } else if (data.domain === "nvh") {
            return (data.laeq_dBA || 0) * 1.2;
          } else if (data.domain === "ride") {
            return (data.iso2631_weightedRMS_ms2 || 0) * 100 + 50;
          } else if (data.domain === "electrical") {
            return data.avgEfficiencyPct || 85;
          } else if (data.domain === "suspension") {
            return data.peakStrainUtilizationPct || 70;
          }
          return 85;
        });
        avgKpi = testKpis.length > 0 ? testKpis.reduce((sum, k, i) => sum + (kpiValues[i] || 85), 0) / testKpis.length : 85;
      }

      testDataRecords.push({
        testName: test.data.testType,
        domain,
        timestamp: test.data.startTime,
        status: test.data.status.toLowerCase().replace(" ", "-"),
        kpi: Math.round(avgKpi * 10) / 10,
        vehicleId: test.data.vehicleId,
        programId: test.data.programId,
        track: test.data.track,
        operator: test.data.operator
      });
    }

    // Batch write testData
    const testDataBatchSize = 500;
    for (let i = 0; i < testDataRecords.length; i += testDataBatchSize) {
      const batch = db.batch();
      const chunk = testDataRecords.slice(i, Math.min(i + testDataBatchSize, testDataRecords.length));
      for (const record of chunk) {
        const docRef = db.collection("testData").doc();
        batch.set(docRef, record);
      }
      await batch.commit();
    }
    console.log(`✅ Created ${testDataRecords.length} testData records\n`);

    // ========== COMPLIANCE COLLECTION (for Compliance page) ==========
    console.log("✅ Seeding compliance collection...");
    const complianceRecords: any[] = [];

    const standardsList = [
      { standard: "FMVSS 135", threshold: 90, domain: "Safety" },
      { standard: "FMVSS 208", threshold: 90, domain: "Safety" },
      { standard: "FMVSS 214", threshold: 90, domain: "Safety" },
      { standard: "ECE R13", threshold: 85, domain: "Safety" },
      { standard: "ISO 2631", threshold: 80, domain: "Ride" },
      { standard: "ISO 8608", threshold: 75, domain: "Durability" },
      { standard: "ISO 16750", threshold: 85, domain: "Environmental" },
      { standard: "VDA 303", threshold: 80, domain: "NVH" },
      { standard: "SAE J211", threshold: 88, domain: "Safety" },
      { standard: "SAE J2522", threshold: 82, domain: "NVH" },
      { standard: "EURO NCAP", threshold: 85, domain: "Safety" },
      { standard: "ISO 10844", threshold: 80, domain: "Safety" }
    ];

    for (const test of tests) {
      if (!test.data.standards || test.data.standards.length === 0) continue;

      for (const standardCode of test.data.standards) {
        const standardInfo = standardsList.find(s => 
          s.standard.includes(standardCode) || standardCode.includes(s.standard.split(" ")[1])
        ) || { standard: standardCode, threshold: 85, domain: "Safety" };

        const baseScore = 75 + Math.random() * 20;
        const isCompliant = baseScore >= standardInfo.threshold;

        complianceRecords.push({
          standard: standardInfo.standard,
          testName: test.data.testType,
          status: isCompliant ? "compliant" : "non-compliant",
          score: Math.round(baseScore * 10) / 10,
          threshold: standardInfo.threshold,
          lastUpdated: test.data.startTime,
          testId: test.id,
          vehicleId: test.data.vehicleId,
          programId: test.data.programId
        });
      }
    }

    // Batch write compliance records
    const complianceBatchSize = 500;
    for (let i = 0; i < complianceRecords.length; i += complianceBatchSize) {
      const batch = db.batch();
      const chunk = complianceRecords.slice(i, Math.min(i + complianceBatchSize, complianceRecords.length));
      for (const record of chunk) {
        const docRef = db.collection("compliance").doc();
        batch.set(docRef, record);
      }
      await batch.commit();
    }
    console.log(`✅ Created ${complianceRecords.length} compliance records\n`);

    // ========== METRICS COLLECTION (for Dashboard) ==========
    console.log("📊 Seeding metrics collection...");
    
    // Calculate aggregated metrics
    const totalTests = tests.length;
    const activeProjects = new Set(tests.map(t => t.data.programId)).size;
    const compliantCount = complianceRecords.filter(r => r.status === "compliant").length;
    const complianceRate = complianceRecords.length > 0 
      ? Math.round((compliantCount / complianceRecords.length) * 1000) / 10 
      : 0;
    
    // Calculate average performance from KPIs
    const performanceValues: number[] = [];
    for (const kpi of kpis) {
      const data = kpi.data;
      if (data.domain === "executive") {
        performanceValues.push((data.safetyComplianceIndex || 0) * 100);
      } else if (data.domain === "brakes") {
        performanceValues.push((data.mfdd || 0) * 10 + 70);
      } else if (data.domain === "nvh") {
        performanceValues.push((data.laeq_dBA || 0) * 1.2);
      } else if (data.domain === "ride") {
        performanceValues.push((data.iso2631_weightedRMS_ms2 || 0) * 100 + 50);
      } else if (data.domain === "electrical") {
        performanceValues.push(data.avgEfficiencyPct || 85);
      } else if (data.domain === "suspension") {
        performanceValues.push(data.peakStrainUtilizationPct || 70);
      }
    }
    const avgPerformance = performanceValues.length > 0
      ? Math.round((performanceValues.reduce((a, b) => a + b, 0) / performanceValues.length) * 10) / 10
      : 85;

    // Generate recent trends (last 30 days)
    const recentTrends: Array<{ date: string; value: number }> = [];
    const currentTime = Date.now();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(currentTime - i * 24 * 60 * 60 * 1000);
      const dayTests = tests.filter(t => {
        const testDate = new Date(t.data.startTime).getTime();
        return testDate >= date.getTime() && testDate < date.getTime() + 24 * 60 * 60 * 1000;
      }).length;
      const dayPerformance = dayTests > 0 ? avgPerformance + (Math.random() - 0.5) * 5 : avgPerformance;
      recentTrends.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(dayPerformance * 10) / 10
      });
    }

    await upsertDoc(db, "metrics", "dashboard", {
      totalTests,
      activeProjects,
      complianceRate,
      avgPerformance,
      recentTrends
    });
    console.log("✅ Created dashboard metrics\n");

    console.log("✅ Seed complete!");
    console.log("\n📊 Summary:");
    console.log(`   Programs: ${programs.length}`);
    console.log(`   Vehicles: ${vehicles.length}`);
    console.log(`   Tests: ${tests.length}`);
    console.log(`   Sensors: ${sensors.length}`);
    console.log(`   Streams: ${streams.length} chunks`);
    console.log(`   Events: ${events.length}`);
    console.log(`   KPIs: ${kpis.length}`);
    console.log(`   ML Predictions: ${mlPredictions.length}`);
    console.log(`   TestData Records: ${testDataRecords.length}`);
    console.log(`   Compliance Records: ${complianceRecords.length}`);
    console.log(`   Dashboard Metrics: 1`);
    console.log("\n🎉 Database is now populated with comprehensive test data!");
    console.log("✨ All dashboard features are now enabled with real data!");
  } catch (e) {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  }
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
