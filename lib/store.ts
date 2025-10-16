'use client';

import { supabase } from './supabase';
import { Guestlist, Guest } from './types';

export const store = {
  async getGuestlists(): Promise<Guestlist[]> {
    const { data: guestlistsData, error: guestlistsError } = await supabase
      .from('guestlists')
      .select('*')
      .order('created_at', { ascending: false });

    if (guestlistsError) {
      console.error('Error fetching guestlists:', guestlistsError);
      return [];
    }

    const guestlists: Guestlist[] = await Promise.all(
      (guestlistsData || []).map(async (list) => {
        const { data: guestsData } = await supabase
          .from('guests')
          .select('*')
          .eq('guestlist_id', list.id)
          .order('registered_at', { ascending: false });

        return {
          id: list.id,
          name: list.name,
          eventName: list.event_name,
          eventDate: list.event_date,
          venue: list.venue,
          description: list.description || undefined,
          maxGuests: list.max_guests || undefined,
          createdBy: list.created_by,
          createdAt: list.created_at,
          isActive: list.is_active,
          guests: (guestsData || []).map((guest) => ({
            id: guest.id,
            name: guest.name,
            email: guest.email,
            phone: guest.phone || undefined,
            plusOnes: guest.plus_ones,
            registeredAt: guest.registered_at,
            status: guest.status as Guest['status'],
          })),
        };
      })
    );

    return guestlists;
  },

  async addGuestlist(
    guestlist: Omit<Guestlist, 'id' | 'createdAt' | 'guests'>
  ): Promise<Guestlist | null> {
    const { data, error } = await supabase
      .from('guestlists')
      .insert({
        name: guestlist.name,
        event_name: guestlist.eventName,
        event_date: guestlist.eventDate,
        venue: guestlist.venue,
        description: guestlist.description || null,
        max_guests: guestlist.maxGuests || null,
        created_by: guestlist.createdBy,
        is_active: guestlist.isActive,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating guestlist:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      eventName: data.event_name,
      eventDate: data.event_date,
      venue: data.venue,
      description: data.description || undefined,
      maxGuests: data.max_guests || undefined,
      createdBy: data.created_by,
      createdAt: data.created_at,
      isActive: data.is_active,
      guests: [],
    };
  },

  async getGuestlistById(id: string): Promise<Guestlist | null> {
    const { data: guestlistData, error: guestlistError } = await supabase
      .from('guestlists')
      .select('*')
      .eq('id', id)
      .single();

    if (guestlistError || !guestlistData) {
      console.error('Error fetching guestlist:', guestlistError);
      return null;
    }

    const { data: guestsData } = await supabase
      .from('guests')
      .select('*')
      .eq('guestlist_id', id)
      .order('registered_at', { ascending: false });

    return {
      id: guestlistData.id,
      name: guestlistData.name,
      eventName: guestlistData.event_name,
      eventDate: guestlistData.event_date,
      venue: guestlistData.venue,
      description: guestlistData.description || undefined,
      maxGuests: guestlistData.max_guests || undefined,
      createdBy: guestlistData.created_by,
      createdAt: guestlistData.created_at,
      isActive: guestlistData.is_active,
      guests: (guestsData || []).map((guest) => ({
        id: guest.id,
        name: guest.name,
        email: guest.email,
        phone: guest.phone || undefined,
        plusOnes: guest.plus_ones,
        registeredAt: guest.registered_at,
        status: guest.status as Guest['status'],
      })),
    };
  },

  async updateGuestlist(id: string, updates: Partial<Guestlist>): Promise<void> {
    const updateData: any = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.eventName !== undefined) updateData.event_name = updates.eventName;
    if (updates.eventDate !== undefined) updateData.event_date = updates.eventDate;
    if (updates.venue !== undefined) updateData.venue = updates.venue;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.maxGuests !== undefined) updateData.max_guests = updates.maxGuests;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

    const { error } = await supabase
      .from('guestlists')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating guestlist:', error);
    }
  },

  async addGuest(
    guestlistId: string,
    guest: Omit<Guest, 'id' | 'registeredAt'>
  ): Promise<Guest | null> {
    const { data, error } = await supabase
      .from('guests')
      .insert({
        guestlist_id: guestlistId,
        name: guest.name,
        email: guest.email,
        phone: guest.phone || null,
        plus_ones: guest.plusOnes,
        status: guest.status,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding guest:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      plusOnes: data.plus_ones,
      registeredAt: data.registered_at,
      status: data.status as Guest['status'],
    };
  },

  async updateGuest(
    guestlistId: string,
    guestId: string,
    updates: Partial<Guest>
  ): Promise<void> {
    const updateData: any = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.plusOnes !== undefined) updateData.plus_ones = updates.plusOnes;
    if (updates.status !== undefined) updateData.status = updates.status;

    const { error } = await supabase
      .from('guests')
      .update(updateData)
      .eq('id', guestId)
      .eq('guestlist_id', guestlistId);

    if (error) {
      console.error('Error updating guest:', error);
    }
  },

  async deleteGuest(guestlistId: string, guestId: string): Promise<void> {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', guestId)
      .eq('guestlist_id', guestlistId);

    if (error) {
      console.error('Error deleting guest:', error);
    }
  },
}; 