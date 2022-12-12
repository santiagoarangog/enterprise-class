import type { IRut } from './generalInfoContract'

export interface AboutBusinessContract {
  history_achievements: string
  why_should_work_with_you: string
  industry_id: number
  industry: string
  quantity_worker_id: number
  quantity_worker: string
  logo?: IRut | null
  web_site: string
}
