import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export const getBannerImages = async (_req: Request, res: Response) => {
  if (!supabase) {
    res.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('banner_images')
      .eq('id', 'banner')
      .maybeSingle();

    if (error) throw error;
    res.status(200).json(data ? data.banner_images : []);
  } catch (error: any) {
    console.error('Erreur getBannerImages:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBannerImages = async (req: Request, res: Response) => {
  if (!supabase) {
    res.status(503).json({ error: 'Supabase is not configured' });
    return;
  }

  try {
    const { bannerImages } = req.body;
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ id: 'banner', banner_images: bannerImages, updated_at: new Date().toISOString() })
      .select();

    if (error) throw error;
    res.status(200).json(data && data[0] ? data[0].banner_images : []);
  } catch (error: any) {
    console.error('Erreur updateBannerImages:', error);
    res.status(500).json({ error: error.message });
  }
};