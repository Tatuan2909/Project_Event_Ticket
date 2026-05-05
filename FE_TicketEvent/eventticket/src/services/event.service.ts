import { attendeeApi } from './api';

export interface Event {
  suKienID: number;
  danhMucID: number;
  diaDiemID: number;
  toChucID: number;
  tenSuKien: string;
  moTa: string | null;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  anhBiaUrl: string | null;
  trangThai: number;
  ngayTao: string;
  // Extended fields (có thể có hoặc không từ backend)
  tenDiaDiem?: string;
  tenDanhMuc?: string;
  giaThapNhat?: number; // Giá vé thấp nhất từ backend
}

export interface LoaiVe {
  loaiVeID: number;
  suKienID: number;
  tenLoaiVe: string;
  moTa?: string;
  donGia: number;
  soLuongToiDa: number;
  soLuongDaBan: number;
  soLuongCon: number;
  gioiHanMoiKhach?: number;
  thoiGianMoBan?: string;
  thoiGianDongBan?: string;
  trangThai: boolean;
  conVe: boolean;
  dangMoBan: boolean;
  trangThaiMoBan: string;
  phanTramDaBan: number;
}

export interface EventDetail extends Event {
  loaiVes: LoaiVe[];
  giaThapNhat: number;
  giaCaoNhat: number;
  tongVeConLai: number;
  conVe: boolean;
}

export interface EventsResponse {
  success: boolean;
  count: number;
  data: Event[];
}

export interface EventDetailResponse {
  success: boolean;
  data: Event;
}

export interface FilterParams {
  danhMucId?: number;
  diaDiemId?: number;
  tuNgay?: string;
  denNgay?: string;
  giaMin?: number;
  giaMax?: number;
  trangThai?: number;
  sapXep?: string;
  page?: number;
  pageSize?: number;
}

const eventService = {
  // Lấy danh sách tất cả sự kiện
  getEvents: async (): Promise<Event[]> => {
    const response = await attendeeApi.get<Event[] | EventsResponse>('/SuKien');
    // Backend có thể trả về trực tiếp array hoặc wrapped object
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return (response.data as EventsResponse).data;
  },

  // Lấy chi tiết sự kiện với danh sách loại vé
  getEventDetail: async (id: number): Promise<EventDetail> => {
    const response = await attendeeApi.get<any>(
      `/SuKien/${id}/detail`
    );
    
    // Backend trả về { success: true, data: { ... } }
    let rawData: any;
    if (response.data.success && response.data.data) {
      rawData = response.data.data;
    } else {
      rawData = response.data;
    }
    
    // Map PascalCase từ C# sang camelCase cho TypeScript
    return {
      suKienID: rawData.SuKienID || rawData.suKienID,
      danhMucID: rawData.DanhMucID || rawData.danhMucID,
      diaDiemID: rawData.DiaDiemID || rawData.diaDiemID,
      toChucID: rawData.ToChucID || rawData.toChucID,
      tenSuKien: rawData.TenSuKien || rawData.tenSuKien,
      moTa: rawData.MoTa || rawData.moTa,
      thoiGianBatDau: rawData.ThoiGianBatDau || rawData.thoiGianBatDau,
      thoiGianKetThuc: rawData.ThoiGianKetThuc || rawData.thoiGianKetThuc,
      anhBiaUrl: rawData.AnhBiaUrl || rawData.anhBiaUrl,
      trangThai: rawData.TrangThai ?? rawData.trangThai ?? 0,
      ngayTao: rawData.NgayTao || rawData.ngayTao,
      tenDiaDiem: rawData.TenDiaDiem || rawData.tenDiaDiem,
      tenDanhMuc: rawData.TenDanhMuc || rawData.tenDanhMuc,
      loaiVes: (rawData.LoaiVes || rawData.loaiVes || []).map((lv: any) => ({
        loaiVeID: lv.LoaiVeID || lv.loaiVeID,
        suKienID: lv.SuKienID || lv.suKienID,
        tenLoaiVe: lv.TenLoaiVe || lv.tenLoaiVe,
        moTa: lv.MoTa || lv.moTa,
        donGia: lv.DonGia || lv.donGia,
        soLuongToiDa: lv.SoLuongToiDa || lv.soLuongToiDa,
        soLuongDaBan: lv.SoLuongDaBan || lv.soLuongDaBan,
        soLuongCon: lv.SoLuongCon || lv.soLuongCon,
        gioiHanMoiKhach: lv.GioiHanMoiKhach || lv.gioiHanMoiKhach,
        thoiGianMoBan: lv.ThoiGianMoBan || lv.thoiGianMoBan,
        thoiGianDongBan: lv.ThoiGianDongBan || lv.thoiGianDongBan,
        trangThai: lv.TrangThai ?? lv.trangThai ?? false,
        conVe: lv.ConVe ?? lv.conVe ?? false,
        dangMoBan: lv.DangMoBan ?? lv.dangMoBan ?? false,
        trangThaiMoBan: lv.TrangThaiMoBan || lv.trangThaiMoBan || '',
        phanTramDaBan: lv.PhanTramDaBan ?? lv.phanTramDaBan ?? 0,
      })),
      giaThapNhat: rawData.GiaThapNhat ?? rawData.giaThapNhat ?? 0,
      giaCaoNhat: rawData.GiaCaoNhat ?? rawData.giaCaoNhat ?? 0,
      tongVeConLai: rawData.TongVeConLai ?? rawData.tongVeConLai ?? 0,
      conVe: rawData.ConVe ?? rawData.conVe ?? false,
    };
  },

  // Lấy chi tiết sự kiện (cũ - không có loại vé)
  getEventById: async (id: number): Promise<Event> => {
    const response = await attendeeApi.get<EventDetailResponse>(`/SuKien/${id}`);
    return response.data.data;
  },

  // Lấy sự kiện sắp diễn ra
  getUpcomingEvents: async (limit: number = 9): Promise<Event[]> => {
    try {
      const response = await attendeeApi.get<Event[] | EventsResponse>(
        `/SuKien/upcoming?limit=${limit}`
      );
      // Backend có thể trả về trực tiếp array hoặc wrapped object
      let events: Event[];
      if (Array.isArray(response.data)) {
        events = response.data;
      } else if (response.data && (response.data as EventsResponse).data && Array.isArray((response.data as EventsResponse).data)) {
        events = (response.data as EventsResponse).data;
      } else {
        console.warn('Unexpected response structure for upcoming events:', response.data);
        return [];
      }
      return events;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
  },

  // Lấy sự kiện phổ biến
  getPopularEvents: async (limit: number = 9): Promise<Event[]> => {
    try {
      const response = await attendeeApi.get<Event[] | EventsResponse>(
        `/SuKien/popular?limit=${limit}`
      );
      // Backend có thể trả về trực tiếp array hoặc wrapped object
      let events: Event[];
      if (Array.isArray(response.data)) {
        events = response.data;
      } else if (response.data && (response.data as EventsResponse).data && Array.isArray((response.data as EventsResponse).data)) {
        events = (response.data as EventsResponse).data;
      } else {
        console.warn('Unexpected response structure for popular events:', response.data);
        return [];
      }
      return events;
    } catch (error) {
      console.error('Error fetching popular events:', error);
      return [];
    }
  },

  // Lấy sự kiện đang diễn ra
  getOngoingEvents: async (limit: number = 9): Promise<Event[]> => {
    try {
      const response = await attendeeApi.get<Event[] | EventsResponse>(
        `/SuKien/filter?trangThai=2&pageSize=${limit}&sortBy=ThoiGianKetThuc&sortOrder=asc`
      );
      // Backend có thể trả về trực tiếp array hoặc wrapped object
      let events: Event[];
      if (Array.isArray(response.data)) {
        events = response.data;
      } else if (response.data && (response.data as EventsResponse).data && Array.isArray((response.data as EventsResponse).data)) {
        events = (response.data as EventsResponse).data;
      } else {
        console.warn('Unexpected response structure for ongoing events:', response.data);
        return [];
      }
      return events;
    } catch (error) {
      console.error('Error fetching ongoing events:', error);
      return [];
    }
  },

  // Tìm kiếm sự kiện
  searchEvents: async (query: string, limit: number = 20): Promise<Event[]> => {
    const response = await attendeeApi.get<EventsResponse>(
      `/SuKien/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    return response.data.data;
  },

  // Lọc sự kiện nâng cao
  filterEvents: async (params: FilterParams): Promise<Event[]> => {
    const queryParams = new URLSearchParams();
    
    if (params.danhMucId) queryParams.append('danhMucId', params.danhMucId.toString());
    if (params.diaDiemId) queryParams.append('diaDiemId', params.diaDiemId.toString());
    if (params.tuNgay) queryParams.append('tuNgay', params.tuNgay);
    if (params.denNgay) queryParams.append('denNgay', params.denNgay);
    if (params.giaMin) queryParams.append('giaMin', params.giaMin.toString());
    if (params.giaMax) queryParams.append('giaMax', params.giaMax.toString());
    if (params.trangThai) queryParams.append('trangThai', params.trangThai.toString());
    if (params.sapXep) queryParams.append('sapXep', params.sapXep);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());

    const response = await attendeeApi.get<EventsResponse>(
      `/SuKien/filter?${queryParams.toString()}`
    );
    return response.data.data;
  }
};

export default eventService;
