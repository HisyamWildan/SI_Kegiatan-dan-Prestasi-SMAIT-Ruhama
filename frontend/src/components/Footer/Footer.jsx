import React from "react";
import {
  FooterWrapper,
  FooterRow,
  FooterCol,
  Logo,
  Description,
  SectionTitle,
  LinkList,
  Copyright,
} from "./Footer.styled";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <FooterRow className="row gy-4">

          {/* LOGO & DESKRIPSI */}
          <FooterCol className="col-lg-6">
            <Logo src="/assets/img/logoruhama.png" alt="SMAIT Ruhama Depok" />
            <Description>
              Sistem Informasi Kegiatan dan Prestasi Sekolah SMAIT Ruhama Depok 
              merupakan platform berbasis web yang dirancang untuk membantu 
              pengelolaan, dokumentasi, dan publikasi kegiatan serta prestasi siswa 
              secara terstruktur dan efisien. <br /><br />

              📞 +62 812-3456-7890 <br />
              📍 Jl. Banjaran Pucung, Cilangkap, Tapos, Depok
            </Description>
          </FooterCol>

          {/* MENU */}
          <FooterCol className="col-lg-2 col-md-4">
            <SectionTitle>Menu</SectionTitle>
            <LinkList>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="#">Tentang</Link></li>
              <li><Link to="#">Informasi</Link></li>
              <li><Link to="/contact">Kontak</Link></li>
            </LinkList>
          </FooterCol>

          {/* INFORMASI */}
          <FooterCol className="col-lg-2 col-md-3">
            <SectionTitle>Informasi</SectionTitle>
            <LinkList>
              <li><Link to="#">Kegiatan Sekolah</Link></li>
              <li><Link to="#">Prestasi Siswa</Link></li>
              <li><Link to="#">Pengumuman</Link></li>
            </LinkList>
          </FooterCol>

          {/* BANTUAN */}
          <FooterCol className="col-lg-2 col-md-3">
            <SectionTitle>Bantuan</SectionTitle>
            <LinkList>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Panduan Pengguna</Link></li>
              <li><Link to="#">Kebijakan Privasi</Link></li>
              <li><Link to="#">Dukungan</Link></li>
            </LinkList>
          </FooterCol>

        </FooterRow>
      </Container>

      {/* COPYRIGHT */}
      <Copyright className="container text-center mt-4">
        <p>
          © <span>2026</span>{" "}
          <strong className="px-1 sitename">
            Sistem Informasi SMAIT Ruhama Depok
          </strong>{" "}
          | All Rights Reserved
        </p>
      </Copyright>
    </FooterWrapper>
  );
}

export default Footer;