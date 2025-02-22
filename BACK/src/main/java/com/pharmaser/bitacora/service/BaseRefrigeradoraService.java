package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.BaseRefrigeradora;
import com.pharmaser.bitacora.repository.BaseRefrigeradoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaseRefrigeradoraService {

    @Autowired
    private BaseRefrigeradoraRepository baseRefrigeradoraRepository;


    public List<BaseRefrigeradora> findAll() {
        return baseRefrigeradoraRepository.findAllByIsDeletedFalse();
    }

    public BaseRefrigeradora findById(Long id) {
        return baseRefrigeradoraRepository.findById(id).orElse(null);
    }

    public BaseRefrigeradora save(BaseRefrigeradora baseRefrigeradora) {
        return baseRefrigeradoraRepository.save(baseRefrigeradora);
    }

    public void softDelete(Long id) {
        BaseRefrigeradora baseRefrigeradora = baseRefrigeradoraRepository.findById(id).orElse(null);
        if (baseRefrigeradora != null) {
            baseRefrigeradora.setIsDeleted(true);
            baseRefrigeradoraRepository.save(baseRefrigeradora);
        }
    }
}
