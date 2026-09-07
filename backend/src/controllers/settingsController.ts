import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const getBannerImages = async (req: Request, res: Response) => {
  if (!supabase) {
    res.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase.from('site_settings').select('banner_images').eq('id', 'banner').single();
    if (error) throw error;
    res.status(200).json(data ? data.banner_images : []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBannerImages = async (req: Request, res: Response) => {
  if (!supabase) {
    res.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { bannerImages } = req.body; // Un tableau de 3 URLs [url1, url2, url3]
    const { data, error } = await supabase.from('site_settings').upsert({ id: 'banner', banner_images: bannerImages, updated_at: new Date() }).select();
    if (error) throw error;
    res.status(200).json(data[0].banner_images);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};