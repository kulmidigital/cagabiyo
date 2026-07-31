/**
 * Curated photography library.
 *
 * Every id below was visually reviewed before being added — the brief calls for
 * imagery of Black professionals, so nothing lands here on the strength of a
 * search keyword alone. Served straight from the Unsplash imgix CDN, which
 * handles format negotiation (`auto=format`) and resizing for us, so we get
 * AVIF/WebP without shipping binaries in the repo (SEO-04, VIDEO-02).
 *
 * Alt text travels with the image rather than the call site so no usage can
 * silently ship without one (A11Y-06).
 */

const CDN = 'https://images.unsplash.com/'

export type Photo = {
  id: string
  alt: string
}

type SrcOptions = {
  /** Rendered width in CSS pixels. */
  w?: number
  /** Aspect ratio as width / height. Omit to keep the source ratio. */
  ratio?: number
  q?: number
  /** Focal point for the crop, when the subject is off-centre. */
  crop?: 'entropy' | 'faces' | 'center' | 'top'
}

/** Build a single CDN URL for a photo. */
export function photoSrc(photo: Photo, opts: SrcOptions = {}): string {
  const { w = 1200, ratio, q = 70, crop = 'faces' } = opts
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    crop,
    w: String(w),
    q: String(q),
  })
  if (ratio) params.set('h', String(Math.round(w / ratio)))
  return `${CDN}${photo.id}?${params.toString()}`
}

/**
 * Build a `srcset` so phones on variable East African networks aren't paying
 * for desktop-sized pixels (RESP-03).
 */
export function photoSrcSet(
  photo: Photo,
  opts: SrcOptions & { widths?: Array<number> } = {},
): string {
  const { widths = [480, 768, 1200, 1800], ...rest } = opts
  return widths
    .map((w) => `${photoSrc(photo, { ...rest, w })} ${w}w`)
    .join(', ')
}

const define = <T extends Record<string, Photo>>(lib: T): T => lib

export const photos = define({
  // -- Advisory & boardroom -------------------------------------------------
  boardroomWide: {
    id: 'photo-1573164574572-cb89e39749b4',
    alt: 'Delegates working through documents around a long boardroom table',
  },
  boardroomBrief: {
    id: 'photo-1573164574511-73c773193279',
    alt: 'Professionals in a bright office reviewing figures together',
  },
  strategyTable: {
    id: 'photo-1573167627769-e201a7ddf409',
    alt: 'Executives listening to a colleague present at a conference table',
  },
  panelDiscussion: {
    id: 'photo-1776039325163-f45315a484f3',
    alt: 'Panel of speakers in discussion at a professional forum',
  },
  workshopRoom: {
    id: 'photo-1573167101669-476636b96cea',
    alt: 'Small training group working on laptops around a shared table',
  },
  teamCouch: {
    id: 'photo-1655720357872-ce227e4164ba',
    alt: 'Colleagues reviewing work together on a laptop in a lounge setting',
  },
  deskReview: {
    id: 'photo-1573164574397-dd250bc8a598',
    alt: 'Analyst working through a report at a workstation',
  },
  collabDesk: {
    id: 'photo-1573164573938-c9a3db2e84ff',
    alt: 'Professional reviewing material on a tablet',
  },
  twoAdvisors: {
    id: 'photo-1573496130141-209d200cebd8',
    alt: 'Two advisors in business dress outside a client office',
  },

  // -- Executive portraits --------------------------------------------------
  execPhone: {
    id: 'photo-1679117349740-c46c819d0373',
    alt: 'Executive in a tailored suit taking a call',
  },
  execChair: {
    id: 'photo-1605602517229-cdbfc3dfb70c',
    alt: 'Senior executive seated in a leather office chair',
  },
  execSuitA: {
    id: 'photo-1666866854783-8943590e37c8',
    alt: 'Portrait of a senior advisor in a blue suit',
  },
  execSuitB: {
    id: 'photo-1666866868698-67ee989fba70',
    alt: 'Portrait of a partner in a blue suit',
  },
  execSuitC: {
    id: 'photo-1666866834805-8cc91d4774ac',
    alt: 'Portrait of a smiling director in business dress',
  },
  execSuitD: {
    id: 'photo-1666866850021-a843a45479af',
    alt: 'Portrait of a faculty lead in a blue suit',
  },
  execOutdoor: {
    id: 'photo-1495603889488-42d1d66e5523',
    alt: 'Professional in a blue suit outside a city office',
  },

  // -- Faculty & learner portraits -----------------------------------------
  portraitBlazer: {
    id: 'photo-1748290880596-2a2c80530bc0',
    alt: 'Confident professional in a black blazer',
  },
  portraitOrange: {
    id: 'photo-1563132337-f159f484226c',
    alt: 'Professional in an orange blazer with arms folded',
  },
  portraitYellow: {
    id: 'photo-1611432579402-7037e3e2c1e4',
    alt: 'Consultant holding a tablet and smiling',
  },
  portraitBlue: {
    id: 'photo-1573497019418-b400bb3ab074',
    alt: 'Smiling professional seated in an office',
  },
  portraitWhite: {
    id: 'photo-1618085219724-c59ba48e08cd',
    alt: 'Professional in a white shirt smiling',
  },
  portraitStudio: {
    id: 'photo-1531123897727-8f129e1688ce',
    alt: 'Studio portrait of a professional in a collared shirt',
  },
  portraitPink: {
    id: 'photo-1618085222100-93f0eecad0aa',
    alt: 'Portrait of a professional against a plain wall',
  },
  portraitCityWindow: {
    id: 'photo-1573496358961-3c82861ab8f4',
    alt: 'Professional seated beside a window overlooking the city',
  },
  analystLaptop: {
    id: 'photo-1573166953836-06864dc70a21',
    alt: 'Analyst reflecting while working at a laptop',
  },
  tabletGlass: {
    id: 'photo-1573164713712-03790a178651',
    alt: 'Consultant reviewing figures on a tablet beside a glass partition',
  },

  // -- Technology, audit & assurance ---------------------------------------
  dataCentre: {
    id: 'photo-1573164713988-8665fc963095',
    alt: 'Systems auditor working between server racks in a data centre',
  },
  nightWork: {
    id: 'photo-1528901166007-3784c7dd3653',
    alt: 'Professional working late at a laptop',
  },

  // -- Events ---------------------------------------------------------------
  auditorium: {
    id: 'photo-1587825140708-dfaf72ae4b04',
    alt: 'Speaker addressing a full auditorium',
  },
  conferenceHall: {
    id: 'photo-1594122230689-45899d9e6f69',
    alt: 'Delegates seated in a packed conference hall',
  },
  keynote: {
    id: 'photo-1544531586-fde5298cdd40',
    alt: 'Keynote speaker presenting to an audience',
  },
  conferenceBlue: {
    id: 'photo-1558008258-3256797b43f3',
    alt: 'Audience watching a presentation in a darkened hall',
  },
  delegates: {
    id: 'photo-1531058020387-3be344556be6',
    alt: 'Delegates networking during a conference break',
  },

  // -- Graduation & credentials --------------------------------------------
  graduatesPair: {
    id: 'photo-1594750852563-5ed8e0421d40',
    alt: 'Two graduates in academic gowns after a ceremony',
  },
  graduatesCelebrate: {
    id: 'photo-1594750852517-f37738fa2384',
    alt: 'Graduates celebrating together in academic dress',
  },
  graduateWoman: {
    id: 'photo-1686213011642-b25f94b95b96',
    alt: 'Graduate in cap and gown at a graduation ceremony',
  },
  graduateSmile: {
    id: 'photo-1612214495858-4f32b96155a7',
    alt: 'Smiling graduate wearing a mortarboard',
  },
  graduationMass: {
    id: 'photo-1706174757544-3fb254ec54fd',
    alt: 'Rows of graduands seated at a graduation ceremony',
  },
  graduatesTwo: {
    id: 'photo-1594750852532-822048f24b14',
    alt: 'Graduate greeted by a colleague after the ceremony',
  },

  // -- Region ---------------------------------------------------------------
  nairobiSkyline: {
    id: 'photo-1611348524140-53c9a25263d6',
    alt: 'Nairobi skyline at dusk',
  },
  nairobiCBD: {
    id: 'photo-1695252509752-4397f05bc59d',
    alt: 'Nairobi central business district',
  },
  nairobiKICC: {
    id: 'photo-1693902997450-7e912c0d3554',
    alt: 'Nairobi city centre with the KICC tower',
  },
  nairobiPark: {
    id: 'photo-1694434948850-ed51bd461733',
    alt: 'Nairobi skyline seen across Uhuru Park',
  },
  nairobiTowers: {
    id: 'photo-1611144727915-ef30a08aaeb3',
    alt: 'High-rise towers in Nairobi',
  },
  nairobiAerial: {
    id: 'photo-1643913224222-17cc6adb2dfc',
    alt: 'Aerial view over Nairobi from a high floor',
  },
})

export type PhotoKey = keyof typeof photos
