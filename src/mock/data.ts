export default {
  successResult: `<?xml version="1.0" encoding="utf-8"?>
    <retcode>0</retcode>
    <describe>success</describe>`,
  errorResult: `<?xml version="1.0" encoding="utf-8"?>
    <retcode>1</retcode>
    <describe>success</describe>`,
  getEncoding: `<?xml version="1.0" encoding="utf-8"?>
  <device_status>
      <url>
          <ts_0>ts disable</ts_0>
          <rtsp_0>rtsp://172.16.7.250:554/stream0</rtsp_0>
          <rtp_0>rtp disable</rtp_0>
          <ts_1>ts disable</ts_1>
          <rtsp_1>rtsp://172.16.7.250:554/stream1</rtsp_1>
          <rtp_1>rtp disable</rtp_1>
          <ts_2>ts disable</ts_2>
          <rtsp_2>rtsp://172.16.7.250:554/stream2</rtsp_2>
      </url>
      <encode>
          <venc_0>
              <en_type>96</en_type> <!-- 96:h264 ; 265:h265 -->
              <venc_aspect_ration>0</venc_aspect_ration>
              <venc_bitrate>4000</venc_bitrate>
              <venc_framerate>30</venc_framerate>
              <venc_gop>150</venc_gop>
              <venc_width>1920</venc_width>
              <venc_height>1080</venc_height>
              <venc_profile>0</venc_profile> <!-- 0:baseling; 1:main; 2:high -->
              <venc_rc_mode>0</venc_rc_mode> <!-- 0:cbr; 1:vbr -->
              <venc_max_qp>32</venc_max_qp>
              <venc_min_i_qp>5</venc_min_i_qp>
              <venc_min_qp>5</venc_min_qp>
          </venc_0>
          <venc_1>
              <en_type>96</en_type>
              <venc_aspect_ration>0</venc_aspect_ration>
              <venc_bitrate>4000</venc_bitrate>
              <venc_framerate>30</venc_framerate>
              <venc_gop>150</venc_gop>
              <venc_width>1920</venc_width>
              <venc_height>1080</venc_height>
              <venc_profile>0</venc_profile>
              <venc_rc_mode>0</venc_rc_mode>
              <venc_max_qp>32</venc_max_qp>
              <venc_min_i_qp>5</venc_min_i_qp>
              <venc_min_qp>5</venc_min_qp>
          </venc_1>
          <venc_2>
              <en_type>96</en_type>
              <venc_aspect_ration>0</venc_aspect_ration>
              <venc_bitrate>4000</venc_bitrate>
              <venc_framerate>25</venc_framerate>
              <venc_gop>150</venc_gop>
              <venc_width>1920</venc_width>
              <venc_height>1080</venc_height>
              <venc_profile>0</venc_profile>
              <venc_rc_mode>0</venc_rc_mode>
              <venc_max_qp>32</venc_max_qp>
              <venc_min_i_qp>5</venc_min_i_qp>
              <venc_min_qp>5</venc_min_qp>
          </venc_2>
      </encode>
      <audio>
          <audio_type>1</audio_type>
          <aenc_bitrate>128000</aenc_bitrate>
          <audio_channel>0</audio_channel>
          <is_he_aac>1</is_he_aac>
      </audio>
      <video>
          <hdmi_video_size>1920 * 1080P</hdmi_video_size>
          <hdmi_video_fps>30</hdmi_video_fps>
          <venc_size_1>9999 * 9999</venc_size_1>
          <venc_fps_1>100</venc_fps_1>
          <venc_size_2>640 * 512</venc_size_2>
          <venc_fps_2>5</venc_fps_2>
      </video>
  </device_status>`,
  getNetwork: `<?xml version="1.0" encoding="utf-8"?>
    <network>
        <ip>172.16.7.250</ip>
        <mask>255.255.255.0</mask>
        <gateway>0.0.0.0</gateway>
        <mac>e6:5b:db:75:79:8a</mac>
        <dns1>8.8.8.8</dns1>
        <dns2>114.114.114.114</dns2>
        <dhcp>0</dhcp>
        <wifi_exist>0</wifi_exist>
    </network>`,
  getVideo: `<?xml version="1.0" encoding="utf-8"?>
<video>
    <video_0>
        <udp_h26x>
            <h26x_en>1</h26x_en> 
            <h26x_mode>0</h26x_mode> <!-- 0:单播；1：主播；2：广播 -->
            <h26x_src_port>5000</h26x_src_port>
            <h26x_dst_ip>235.0.0.0</h26x_dst_ip>
            <h26x_dst_port>5000</h26x_dst_port>
            <h26x_send_len>200</h26x_send_len>
            <h26x_send_interval>60</h26x_send_interval>
        </udp_h26x>
        <udp_ts>
            <ts_en>0</ts_en>
            <ts_mode>0</ts_mode>
            <ts_src_port>5000</ts_src_port>
            <ts_dst_ip>235.0.0.0</ts_dst_ip>
            <ts_dst_port>5000</ts_dst_port>
            <ts_send_len>200</ts_send_len>
            <ts_send_interval>60</ts_send_interval>
        </udp_ts>
        <rtsp>
            <rtsp_en>1</rtsp_en>
            <rtsp_port>5000</rtsp_port>
            <trans_mode>0</trans_mode><!-- 0:udp; 1:tcp -->
            <stream_name>stream0</stream_name>
            <user_size>5</user_size>
            <keep_alive>30</keep_alive>
        </rtsp>
        <rtmp>
            <rtmp_en>0</rtmp_en>
            <rtmp_url>rtmp://192.168.0.500/stream0.flv</rtmp_url>
        </rtmp>
        <gb28181>
            <gb_en>0</gb_en>
            <gb_server_ip>192.168.0.1</gb_server_ip>
            <gb_server_port>8888</gb_server_port>
            <gb_server_id>5000</gb_server_id>
            <gb_period>2000</gb_period>
            <heart_beat>60</heart_beat>
            <local_sip_port>6666</local_sip_port>
            <gb_auth_id>22222222</gb_auth_id>
            <gb_passwd>1234</gb_passwd>
        </gb28181>
    </video_0>
    <video_1>
    <udp_h26x>
    <h26x_en>1</h26x_en> 
    <h26x_mode>0</h26x_mode> <!-- 0:单播；1：主播；2：广播 -->
    <h26x_src_port>5000</h26x_src_port>
    <h26x_dst_ip>235.0.0.0</h26x_dst_ip>
    <h26x_dst_port>5000</h26x_dst_port>
    <h26x_send_len>200</h26x_send_len>
    <h26x_send_interval>60</h26x_send_interval>
</udp_h26x>
<udp_ts>
    <ts_en>0</ts_en>
    <ts_mode>0</ts_mode>
    <ts_src_port>5000</ts_src_port>
    <ts_dst_ip>235.0.0.0</ts_dst_ip>
    <ts_dst_port>5000</ts_dst_port>
    <ts_send_len>200</ts_send_len>
    <ts_send_interval>60</ts_send_interval>
</udp_ts>
<rtsp>
    <rtsp_en>1</rtsp_en>
    <rtsp_port>5000</rtsp_port>
    <trans_mode>0</trans_mode><!-- 0:udp; 1:tcp -->
    <stream_name>stream0</stream_name>
    <user_size>5</user_size>
    <keep_alive>30</keep_alive>
</rtsp>
<rtmp>
    <rtmp_en>0</rtmp_en>
    <rtmp_url>rtmp://192.168.0.500/stream0.flv</rtmp_url>
</rtmp>
<gb28181>
    <gb_en>0</gb_en>
    <gb_server_ip>192.168.0.1</gb_server_ip>
    <gb_server_port>8888</gb_server_port>
    <gb_server_id>5000</gb_server_id>
    <gb_period>2000</gb_period>
    <heart_beat>60</heart_beat>
    <local_sip_port>6666</local_sip_port>
    <gb_auth_id>22222222</gb_auth_id>
    <gb_passwd>1234</gb_passwd>
</gb28181>
    </video_1>
    <video_2>
    <udp_h26x>
    <h26x_en>1</h26x_en> 
    <h26x_mode>0</h26x_mode> <!-- 0:单播；1：主播；2：广播 -->
    <h26x_src_port>5000</h26x_src_port>
    <h26x_dst_ip>235.0.0.0</h26x_dst_ip>
    <h26x_dst_port>5000</h26x_dst_port>
    <h26x_send_len>200</h26x_send_len>
    <h26x_send_interval>60</h26x_send_interval>
</udp_h26x>
<udp_ts>
    <ts_en>0</ts_en>
    <ts_mode>0</ts_mode>
    <ts_src_port>5000</ts_src_port>
    <ts_dst_ip>235.0.0.0</ts_dst_ip>
    <ts_dst_port>5000</ts_dst_port>
    <ts_send_len>200</ts_send_len>
    <ts_send_interval>60</ts_send_interval>
</udp_ts>
<rtsp>
    <rtsp_en>1</rtsp_en>
    <rtsp_port>5000</rtsp_port>
    <trans_mode>0</trans_mode><!-- 0:udp; 1:tcp -->
    <stream_name>stream0</stream_name>
    <user_size>5</user_size>
    <keep_alive>30</keep_alive>
</rtsp>
<rtmp>
    <rtmp_en>0</rtmp_en>
    <rtmp_url>rtmp://192.168.0.500/stream0.flv</rtmp_url>
</rtmp>
<gb28181>
    <gb_en>0</gb_en>
    <gb_server_ip>192.168.0.1</gb_server_ip>
    <gb_server_port>8888</gb_server_port>
    <gb_server_id>5000</gb_server_id>
    <gb_period>2000</gb_period>
    <heart_beat>60</heart_beat>
    <local_sip_port>6666</local_sip_port>
    <gb_auth_id>22222222</gb_auth_id>
    <gb_passwd>1234</gb_passwd>
</gb28181>
    </video_2>
</video>`,
  getVersion: `<?xml version="1.0" encoding="utf-8"?>
  <set>
      <version>V1.2.1_20240529_10:41:24 V0.0</version>
  </set>`,
  getUserCommunication: `<?xml version="1.0" encoding="utf-8"?>
  <communication>
      <udp>
          <udp_en>1</udp_en>
          <udp_local_port>3000</udp_local_port>
          <udp_dst_ip>255.255.255.255</udp_dst_ip>
          <udp_dst_port>6000</udp_dst_port>
      </udp>
      <uart>
          <uart_en>0</uart_en>
          <baudrate>115200</baudrate>
          <data_bit>8</data_bit>
          <stop_bit>2</stop_bit>
          <parity_bit>0</parity_bit> <!-- 0:无，1，奇校验；2，偶校 -->
      </uart>
      <check_data>0</check_data> <!-- 0:关闭；1: 开启 -->
      <metedata>0</metedata>          <!-- 元数据 0;关闭；1：开启 -->
  </communication>`,
  getStore: `<?xml version="1.0" encoding="utf-8"?>
  <record>
  <record_type>0</record_type>
  <record_mode>0</record_mode>
  <record_duration>1</record_duration>
  <disk_total_size>166666</disk_total_size>
  <disk_free_size>2000</disk_free_size>
  <ch0_record_en>0</ch0_record_en>
  <ch1_record_en>0</ch1_record_en>
  <ch2_record_en>0</ch2_record_en>
  </record>`,
  getSystemMaintenance: `<?xml version="1.0" encoding="utf-8"?>
	<maintenance>
		<product>
			<product_no>QP-125T</product_no> <!-- 产品型号 -->
			<product_sn>002-0006</product_sn> <!-- 产品编号 -->
			<note>hahha</note> <!-- 备注 -->
			<lock>false</lock> <!-- true/false -->
		</product>
		<config>
			<tv1>X1</tv1>
			<tv2>X4</tv2>
			<ir1>X2</ir1>
			<la>X3</la>
			<user_protocol>X1</user_protocol>
		</config>
		<ptz> <!-- 云台参数 -->
			<angle_zero_0> <!-- 角度零位 -->
				<angle_yaw>232.16000</angle_yaw> 		<!-- 方位 -->
				<angle_pitch>98.66000</angle_pitch>				<!-- 俯仰 -->
				<angle_roll>15.55000</angle_roll>				<!-- 滚转 -->
				<type>0</type>			
			</angle_zero_0>
            <angle_zero_1> <!-- 角度零位 -->
				<angle_yaw>232.16000</angle_yaw> 		<!-- 方位 -->
				<angle_pitch>98.66000</angle_pitch>				<!-- 俯仰 -->
				<angle_roll>15.55000</angle_roll>				<!-- 滚转 -->
				<type>1</type>			
			</angle_zero_1>
			<install_zero> <!-- 安装误差 -->
				<install_yaw>0.00000</install_yaw> 	<!-- 方位 -->
				<install_pitch>0.00000</install_pitch> 			<!-- 俯仰 -->
				<install_roll>0.00000</install_roll>				<!-- 滚转 -->
			</install_zero>
			
			<yaw_kp>5.00000</yaw_kp> <!-- 方位KP -->
			<yaw_ki>1500.00000</yaw_ki> <!-- 方位Ki -->
			<yaw_fp>0.00000</yaw_fp> <!-- 方位Fp -->
			
			<pitch_kp>15.00000</pitch_kp> <!-- 俯仰KP -->
			<pitch_ki>5000.00000</pitch_ki> <!-- 俯仰Ki -->
			<pitch_fp>0.00000</pitch_fp> <!-- 俯仰Fp -->
			
			<roll_kp>0.00000</roll_kp> <!-- 滚转 kp -->
			<roll_ki>0.00000</roll_ki> <!-- 滚转 Ki -->
			<roll_fp>0.00000</roll_fp> <!-- 滚转 Fp -->
			
			<xa>0.00000</xa>
			<xb>0.01136</xb>
			<ya>0.00000</ya>
			<yb>0.02602</yb>
			<za>0.00000</za>
			<zb>-0.01495</zb>

            <moter_yaw_zero>1.2</moter_yaw_zero> <!-- 电机方位零 -->
			<moter_pitch_zero>1.00</moter_pitch_zero> <!-- 电机方位零 -->
			<moter_out_yaw_zero>2.00</moter_out_yaw_zero> <!-- 电机外方位零 -->
			<moter_out_pitch_zero>3.00</moter_out_pitch_zero> <!-- 电机外俯仰零 -->
			<moter_roll_zero>4.00</moter_roll_zero> <!-- 电机方位零 -->
		</ptz>
	</maintenance>`,
  loginForSystemInfo: `<?xml version="1.0" encoding="utf-8"?>
	<auth>
		<user>root</user>
		<passwd>12345</passwd>
	</auth> `,
  getUpProgress(progress: number) {
    return `<?xml version="1.0" encoding="utf-8"?>
	<get_upgrade>
	<up_progress>${progress}</up_progress> 
	</get_upgrade>`
  }
}
