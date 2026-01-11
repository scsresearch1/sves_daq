import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler'
import { db, admin } from '../config/firebase'

type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot

const router = Router()

// Get domain-specific data (KPIs, streams, events)
router.get(
  '/:domain',
  asyncHandler(async (req, res) => {
    try {
      const { domain } = req.params
      const { testId, vehicleId, programId } = req.query

      // Check if Firebase is initialized
      try {
        db.collection('kpis')
      } catch (firebaseError: any) {
        console.error('[Domain API] Firebase not initialized:', firebaseError.message)
        return res.json({
          domain: domain.toLowerCase(),
          kpis: [],
          tests: [],
          events: [],
          error: 'Firebase is not initialized. Please configure Firebase credentials.',
        })
      }

      // Map domain names
      const domainMap: { [key: string]: string } = {
        chassis: 'suspension',
        brake: 'brakes',
        nvh: 'nvh',
        ride: 'ride',
        powertrain: 'electrical',
        environment: 'environment',
      }

      const firebaseDomain = domainMap[domain.toLowerCase()] || domain.toLowerCase()

      // Fetch KPIs for this domain
      let kpiQuery: any = db.collection('kpis').where('domain', '==', firebaseDomain)
      if (testId) kpiQuery = kpiQuery.where('testId', '==', testId)
      if (vehicleId) kpiQuery = kpiQuery.where('vehicleId', '==', vehicleId)
      if (programId) kpiQuery = kpiQuery.where('programId', '==', programId)

      const kpiSnapshot = await kpiQuery.get()
      const kpis = kpiSnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      console.log(`[Domain API] Fetched ${kpis.length} KPIs for domain: ${firebaseDomain}`)

      // Fetch related tests
      let testQuery: any = db.collection('tests')
      if (testId) {
        testQuery = testQuery.where('__name__', '==', testId)
      } else if (vehicleId) {
        // Note: This would need a vehicleId field in tests collection
        testQuery = testQuery.limit(10)
      } else {
        testQuery = testQuery.limit(10)
      }

      const testSnapshot = await testQuery.get()
      const tests = testSnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Fetch related events
      // Map domain to event types
      const eventTypeMap: { [key: string]: string[] } = {
        suspension: ['HighStrain', 'Landing', 'BottomOut', 'GOut', 'RockCrawl'],
        brakes: ['BrakeStop', 'ABSActivation', 'BrakeSqueal'],
        nvh: ['BrakeSqueal', 'Washboard'],
        ride: ['Washboard', 'Landing'],
        electrical: [],
        environment: ['WinterSoak', 'DesertSoak'],
      }

      let eventQuery: any = db.collection('events')
      if (testId) {
        eventQuery = eventQuery.where('testId', '==', testId)
      }
      const eventSnapshot = await eventQuery.limit(50).get() // Get more to filter
      let events = eventSnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Filter events by domain-specific types if available
      const eventTypes = eventTypeMap[firebaseDomain] || []
      if (eventTypes.length > 0) {
        events = events.filter((event: any) => 
          eventTypes.includes(event.eventType)
        )
      }
      events = events.slice(0, 20) // Limit after filtering

      res.json({
        domain: firebaseDomain,
        kpis,
        tests,
        events,
      })
    } catch (error: any) {
      console.error(`[Domain API] Error fetching domain data for ${req.params.domain}:`, error)
      // Return empty data instead of throwing to prevent 500 errors
      res.json({
        domain: req.params.domain.toLowerCase(),
        kpis: [],
        tests: [],
        events: [],
        error: error.message || 'Failed to fetch domain data',
      })
    }
  })
)

// Get streams for a domain/test
router.get(
  '/:domain/streams',
  asyncHandler(async (req, res) => {
    try {
      const { domain } = req.params
      const { testId, limit = 10 } = req.query

      // Check if Firebase is initialized
      try {
        db.collection('streams')
      } catch (firebaseError: any) {
        console.error('[Domain API] Firebase not initialized:', firebaseError.message)
        return res.json([])
      }

      // Map domain to sensor prefixes
      const sensorPrefixMap: { [key: string]: string[] } = {
        chassis: ['strain', 'force', 'load', 'suspension'],
        brake: ['brake', 'pressure', 'decel', 'speed', 'abs'],
        nvh: ['mic', 'spl', 'freq', 'order', 'rpm', 'vibration'],
        ride: ['accel', 'seat', 'steer', 'iso'],
        powertrain: ['power', 'voltage', 'current', 'thd', 'efficiency'],
        environment: ['temp', 'ambient', 'thermal', 'environment'],
      }

      const domainLower = domain.toLowerCase()
      const sensorPrefixes = sensorPrefixMap[domainLower] || []

      let query: any = db.collection('streams')

      if (testId) {
        query = query.where('testId', '==', testId)
      }

      const snapshot = await query.limit(Number(limit) * 2).get() // Get more to filter
      let streams = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Filter by sensor type if domain-specific prefixes exist
      if (sensorPrefixes.length > 0) {
        streams = streams.filter((stream: any) => {
          const streamSensorId = (stream.sensorId || '').toLowerCase()
          return sensorPrefixes.some(prefix => streamSensorId.includes(prefix))
        })
      }

      // Limit after filtering
      streams = streams.slice(0, Number(limit))

      res.json(streams)
    } catch (error: any) {
      console.error(`[Domain API] Error fetching streams for ${req.params.domain}:`, error)
      // Return empty array instead of throwing to prevent 500 errors
      res.json([])
      return
    }
  })
)

export default router
